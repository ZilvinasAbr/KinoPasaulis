using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Repositories.CinemaStudio;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Services
{
  public class MovieService : IMovieService
  {
    private readonly IMovieRepository _movieRepository;
    private readonly ApplicationDbContext _dbContext;

    public MovieService(IMovieRepository movieRepository, ApplicationDbContext dbContext)
    {
      _movieRepository = movieRepository;
      _dbContext = dbContext;
    }

    public IEnumerable<Movie> SearchMovies(string movieTitle)
    {
      IEnumerable<Movie> movies = _movieRepository.GetMoviesByTitle(movieTitle);

      return movies;
    }

    public bool AddNewMovie(Movie movie, List<string> imageNames, List<string> imageTitles,
        List<string> imageDescriptions, List<Video> videos, List<MovieCreator> movieCreators,
        string userId)
    {
      var movieWithSameId = _dbContext.Movies.SingleOrDefault(m => m.Id == movie.Id);

      if (movieWithSameId != null)
      {
        return false;
      }

      var images = new List<Image>();

      for (int i = 0; i < imageNames.Count; i++)
      {
        var image = new Image
        {
          CreatedOn = DateTime.Now,
          Title = imageTitles[i],
          Description = imageDescriptions[i],
          Url = imageNames[i]
        };

        images.Add(image);
      }

      foreach (var video in videos)
      {
        video.CreatedOn = DateTime.Now;
      }

      var cinemaStudio = _dbContext.Users
          .Include(u => u.CinemaStudio)
          .SingleOrDefault(au => au.Id == userId)
          .CinemaStudio;

      movie.CinemaStudio = cinemaStudio;
      movie.Images = images;
      movie.Videos = videos;

      var movieCreatorMovies = new List<MovieCreatorMovie>();
      foreach (var movieCreator in movieCreators)
      {
        var movieCreatorMovie = new MovieCreatorMovie
        {
          MovieCreatorId = movieCreator.Id,
          Movie = movie
        };
        movieCreatorMovies.Add(movieCreatorMovie);
      }
      movie.MovieCreatorMovies = movieCreatorMovies;

      _dbContext.Movies.Add(movie);
      _dbContext.SaveChanges();

      return true;
    }

    public bool DeleteMovie(int id, string userId)
    {
      var movie = _dbContext.Movies
          .Include(m => m.Images)
          .Include(m => m.Videos)
          .Include(m => m.MovieCreatorMovies)
          .SingleOrDefault(m => m.Id == id);

      var cinemaStudio = _dbContext.Users
          .Include(u => u.CinemaStudio)
          .SingleOrDefault(au => au.Id == userId)
          .CinemaStudio;

      if (movie == null || cinemaStudio == null)
      {
        return false;
      }

      if (movie.CinemaStudioId != cinemaStudio.Id)
      {
        return false;
      }


      _dbContext.Images.RemoveRange(movie.Images);
      _dbContext.Videos.RemoveRange(movie.Videos);
      _dbContext.RemoveRange(movie.MovieCreatorMovies);
      _dbContext.Movies.Remove(movie);
      _dbContext.SaveChanges();

      return true;
    }

    public bool EditMovie(Movie movie, List<Video> videos, List<MovieCreator> movieCreators, string userId)
    {
      var movieWithSameId = _dbContext.Movies
          .Include(m => m.MovieCreatorMovies)
          .Include(m => m.Videos)
          .SingleOrDefault(m => m.Id == movie.Id);

      if (movieWithSameId == null)
      {
        return false;
      }

      movieWithSameId.Title = movie.Title;
      movieWithSameId.AgeRequirement = movie.AgeRequirement;
      movieWithSameId.Budget = movie.Budget;
      movieWithSameId.Description = movie.Description;
      movieWithSameId.Duration = movie.Duration;
      movieWithSameId.Gross = movie.Gross;
      movieWithSameId.Language = movie.Language;
      movieWithSameId.ReleaseDate = movie.ReleaseDate;

      _dbContext.Videos.RemoveRange(movieWithSameId.Videos);

      foreach (var video in videos)
      {
        video.Id = 0;
        video.CreatedOn = DateTime.Now;
        video.Movie = movieWithSameId;
      }

      _dbContext.Videos.AddRange(videos);

      var movieCreatorMoviesToDelete = movieWithSameId.MovieCreatorMovies
          .Where(mcm => !movieCreators.Select(mc => mc.Id).Contains(mcm.MovieCreatorId));

      var movieCreatorMoviesToAdd = movieCreators
          .Select(mc => new MovieCreatorMovie
          {
            MovieId = movieWithSameId.Id,
            MovieCreatorId = mc.Id
          })
          .Where(
              mcm =>
                  !movieWithSameId.MovieCreatorMovies.Select(mc => mc.MovieCreatorId).Contains(mcm.MovieCreatorId));

      _dbContext.MovieCreatorMovies.RemoveRange(movieCreatorMoviesToDelete);
      _dbContext.MovieCreatorMovies.AddRange(movieCreatorMoviesToAdd);
      _dbContext.SaveChanges();

      return true;
    }
  }
}
