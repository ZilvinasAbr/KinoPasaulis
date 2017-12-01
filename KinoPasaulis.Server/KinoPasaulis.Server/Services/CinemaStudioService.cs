using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.Repositories.CinemaStudio;
using KinoPasaulis.Server.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Internal.Networking;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Services
{
  public class CinemaStudioService : ICinemaStudioService
  {
    private readonly IMovieRepository _movieRepository;
    private readonly ApplicationDbContext _dbContext;
    private readonly IHostingEnvironment _environment;

    public CinemaStudioService(IMovieRepository movieRepository,
        ApplicationDbContext dbContext,
        IHostingEnvironment environment)
    {
      _movieRepository = movieRepository;
      _dbContext = dbContext;
      _environment = environment;
    }

    public IEnumerable<CinemaStudioStatisticsViewModel> GetCinemaStudiosStatistics()
    {
      var cinemaStudios = _dbContext.CinemaStudios
          .Include(studio => studio.Movies)
              .ThenInclude(movie => movie.Ratings)
          .Include(studio => studio.Movies)
              .ThenInclude(movie => movie.Events)
          .ToList();

      var results = new List<CinemaStudioStatisticsViewModel>();
      foreach (var cinemaStudio in cinemaStudios)
      {
        var result = new CinemaStudioStatisticsViewModel
        {
          Name = cinemaStudio.Name,
          MoviesCount = cinemaStudio.Movies.Count,
          SumOfAllMovieEvents =
                cinemaStudio.Movies.SelectMany(
                        movie => movie.Events.Where(e => e.StartTime <= DateTime.Now && DateTime.Now <= e.EndTime))
                    .Count()
        };

        if (!cinemaStudio.Movies.Any())
        {
          result.AverageMovieRating = 0;
          result.BestMovieRating = 0;
        }
        else
        {
          var moviesWithRating = cinemaStudio.Movies.Where(movie => movie.Ratings.Any());
          if (!moviesWithRating.Any())
          {
            result.AverageMovieRating = 0.0;
            result.BestMovieRating = 0.0;
          }
          else
          {
            result.AverageMovieRating =
            cinemaStudio.Movies.Where(movie => movie.Ratings.Any()).Average(
                movie => movie.Ratings.Average(r => r.Value));
            result.BestMovieRating =
                cinemaStudio.Movies.Max(movie => movie.Ratings.Any() ? movie.Ratings.Average(r => r.Value) : 0.0);
          }
        }
        results.Add(result);
      }

      return results;
    }

    public IEnumerable<Movie> GetCinemaStudioMovies(string userId)
    {
      var cinemaStudio = _dbContext.Users
          .Include(u => u.CinemaStudio)
          .SingleOrDefault(au => au.Id == userId)
          .CinemaStudio;

      if (cinemaStudio == null)
      {
        return null;
      }

      var movies = _dbContext.Movies
          .Where(movie => movie.CinemaStudioId == cinemaStudio.Id)
          .ToList();

      return movies;
    }

    public object GetCinemaStudioMovie(int movieId, string userId)
    {
      var movie = _dbContext.Movies
          .Include(m => m.MovieCreatorMovies)
              .ThenInclude(mcm => mcm.MovieCreator)
          .Include(m => m.Images)
          .Include(m => m.Videos)
          .Include(m => m.CinemaStudio)
          .Include(m => m.Events)
              .ThenInclude(e => e.Theather)
          .Include(m => m.Ratings)
          .SingleOrDefault(m => m.Id == movieId);

      var currentEvents = movie.Events.Where(e => e.StartTime <= DateTime.Now && DateTime.Now <= e.EndTime);
      var pastEvents = movie.Events.Where(e => e.EndTime < DateTime.Now);
      var movieCreators = movie.MovieCreatorMovies
          .Where(mcm => mcm.IsConfirmed != null && mcm.IsConfirmed.Value)
          .Select(creatorMovie => creatorMovie.MovieCreator);

      return new
      {
        PastEvents = pastEvents,
        CurrentEvents = currentEvents,
        movie.Id,
        movie.Title,
        movie.Images,
        movie.AgeRequirement,
        movie.Videos,
        movie.Budget,
        movie.Gross,
        movie.Description,
        movie.ReleaseDate,
        movie.Ratings,
        movie.JobAdvertisements,
        movie.Language,
        movie.Duration,
        movie.Duration.Hours,
        movie.Duration.Minutes,
        movieCreators
      };
    }

    public IEnumerable<Specialty> GetSpecialties()
    {
      var specialties = _dbContext.Specialties
          .ToList();

      return specialties;
    }

    public IEnumerable<MovieStatisticsViewModel> GetCinemaStudiosMoviesStatistics(string userId)
    {
      var cinemaStudio = _dbContext.Users
          .Include(u => u.CinemaStudio)
          .SingleOrDefault(au => au.Id == userId)
          .CinemaStudio;

      if (cinemaStudio == null)
      {
        return null;
      }

      var moviesStatistics = _dbContext.CinemaStudios
          .Include(cs => cs.Movies)
              .ThenInclude(movie => movie.Ratings)
          .Include(cs => cs.Movies)
              .ThenInclude(movie => movie.Events)
                  .ThenInclude(e => e.Shows)
                      .ThenInclude(show => show.Orders)
          .SingleOrDefault(cs => cs.Id == cinemaStudio.Id)
          .Movies
          .Select(movie => new MovieStatisticsViewModel
          {
            Title = movie.Title,
            Rating = movie.Ratings.Any() ? movie.Ratings.Average(rating => rating.Value) : 0.0,
            EventsCount = movie.Events.Count(e => e.StartTime <= DateTime.Now && DateTime.Now <= e.EndTime),
            OrdersBought = movie.Events
                  .SelectMany(e => e.Shows)
                  .SelectMany(show => show.Orders)
                  .Sum(order => order.Amount)

          })
          .ToList();

      return moviesStatistics;
    }
  }
}
