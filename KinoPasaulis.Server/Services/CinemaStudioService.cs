using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
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
                .SingleOrDefault(cs => cs.Id == cinemaStudio.Id)
                .Movies
                .Select(movie => new MovieStatisticsViewModel
                {
                    Title = movie.Title,
                    Rating = movie.Ratings.Any() ? movie.Ratings.Average(rating => rating.Value) : 0.0,
                    EventsCount = movie.Events.Count(e => e.StartTime <= DateTime.Now && DateTime.Now <= e.EndTime)
                })
                .ToList();

            return moviesStatistics;
        }

        public bool AddJobAdvertisement(AddJobAdvertisementViewModel model, string userId)
        {
            var user = _dbContext.Users
                .Include(au => au.CinemaStudio)
                    .ThenInclude(studio => studio.Movies)
                .SingleOrDefault(au => au.Id == userId);

            if (user == null)
            {
                return false;
            }

            var cinemaStudio = user.CinemaStudio;

            var movie = cinemaStudio.Movies.SingleOrDefault(m => m.Id == model.Movie.Id);
            var specialty = _dbContext.Specialties.SingleOrDefault(sp => sp.Id == model.Specialty.Id);

            if (movie == null || specialty == null)
            {
                return false;
            }

            var jobAdvertisement = new JobAdvertisement
            {
                Movie = movie,
                Specialty = specialty,
                Title = model.Title,
                Description = model.Description,
                Duration = model.Duration,
                PayRate = model.PayRate
            };

            specialty.Quantity++;
            _dbContext.JobAdvertisements.Add(jobAdvertisement);
            _dbContext.SaveChanges();

            return true;
        }

        public object GetCinemaStudiosJobAdvertisements(string userId)
        {
            var user = _dbContext.Users
                .Include(au => au.CinemaStudio)
                    .ThenInclude(cinema => cinema.Movies)
                        .ThenInclude(movie => movie.JobAdvertisements)
                            .ThenInclude(jobAd => jobAd.Specialty)
                .SingleOrDefault(au => au.Id == userId);

            var cinemaStudio = user?.CinemaStudio;

            var jobAdvertisements = cinemaStudio?.Movies
                .SelectMany(movie => movie.JobAdvertisements)
                .Select(jobAd => new
                {
                    jobAd.Id,
                    jobAd.Title,
                    jobAd.Duration,
                    jobAd.PayRate,
                    MovieTitle = jobAd.Movie.Title,
                    SpecialtyTitle = jobAd.Specialty.Title
                });

            return jobAdvertisements;
        }

        public bool DeleteJobAdvertisement(int id, string userId)
        {
            var jobAdvertisement = _dbContext.JobAdvertisements
                .Include(jobAd => jobAd.Movie)
                .SingleOrDefault(jobAd => jobAd.Id == id);
            var cinemaStudio = _dbContext.Users
                .Include(u => u.CinemaStudio)
                .SingleOrDefault(au => au.Id == userId)
                .CinemaStudio;

            if (jobAdvertisement == null || cinemaStudio == null)
            {
                return false;
            }

            if (jobAdvertisement.Movie.CinemaStudioId != cinemaStudio.Id)
            {
                return false;
            }

            _dbContext.JobAdvertisements.Remove(jobAdvertisement);
            _dbContext.SaveChanges();

            return true;
        }

        public object GetCinemaStudioMovie(int movieId, string userId)
        {
            var movie = _dbContext.Movies
                .Include(m => m.Images)
                .Include(m => m.Videos)
                .Include(m => m.CinemaStudio)
                .Include(m => m.Events)
                    .ThenInclude(e => e.Theather)
                .Include(m => m.Ratings)
                .SingleOrDefault(m => m.Id == movieId);

            var currentEvents = movie.Events.Where(e => e.StartTime <= DateTime.Now && DateTime.Now <= e.EndTime);
            var pastEvents = movie.Events.Where(e => e.EndTime < DateTime.Now);

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
                movie.Language
            };
        }
    }
}
