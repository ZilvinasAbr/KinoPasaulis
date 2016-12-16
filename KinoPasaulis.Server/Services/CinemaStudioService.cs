using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Repositories.CinemaStudio;
using KinoPasaulis.Server.ViewModels;
using Microsoft.AspNetCore.Hosting;
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

        public IEnumerable<Movie> SearchMovies(string movieTitle)
        {
            IEnumerable<Movie> movies = _movieRepository.GetMoviesByTitle(movieTitle);

            return movies;
        }

        public bool AddNewMovie(Movie movie, List<string> imageNames, List<Video> videos,
            List<MovieCreator> movieCreators, string userId)
        {
            var movieWithSameId = _dbContext.Movies.SingleOrDefault(m => m.Id == movie.Id);

            if (movieWithSameId != null)
            {
                return false;
            }

            var images = new List<Image>();
            foreach (var imageName in imageNames)
            {
                var image = new Image
                {
                    CreatedOn = DateTime.Now,
                    Description = "Empty",
                    Title = "Empty",
                    Url = imageName
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
            _dbContext.Movies.Remove(movie);
            _dbContext.SaveChanges();

            return true;
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
    }
}
