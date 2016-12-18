using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Services
{
    public class MovieCreatorService : IMovieCreatorService
    {
        private readonly ApplicationDbContext _dbContext;

        public MovieCreatorService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<MovieCreator> GetMovieCreators()
        {
            var movieCreators = _dbContext.MovieCreators
                .ToList();

            return movieCreators;
        }

        public List<Movie> GetMovieCreatorPendingMovies(int id)
        {
            var movies = _dbContext.MovieCreatorMovies.Where(mc => mc.MovieCreatorId == id && mc.IsConfirmed == null)
                .Include(mc => mc.Movie)
                    .ThenInclude(mc => mc.Images)
                .Include(mc => mc.Movie)
                    .ThenInclude(mc => mc.CinemaStudio)
                    .ToList();

            var moviesList = movies.Select(movie => movie.Movie)
                .ToList();
            return moviesList;
        }

        public IEnumerable<Movie> GetMovieCreatorMovies(int id)
        {
            var movies = _dbContext.MovieCreatorMovies
                .Where(mc => mc.MovieCreatorId == id && mc.IsConfirmed == true)
                .Include(mc => mc.Movie)
                    .ThenInclude(mc => mc.Images)
                .Include(mc => mc.Movie)
                    .ThenInclude(mc => mc.CinemaStudio)
                    .ToList();

            var moviesList = movies.Select(movie => movie.Movie)
                .ToList();

            return moviesList;
        }

        public bool SetIsConfirmed(string userId, bool value, int movieCreatorId, int movieId)
        {
            var movieCreator2 = _dbContext.Users
                .Include(user => user.MovieCreator)
                .SingleOrDefault(user => user.Id == userId)
                ?.MovieCreator;


            var movieCreatorMovie = _dbContext.MovieCreatorMovies
                .SingleOrDefault(
                    mcm => mcm.MovieCreatorId == movieCreator2.Id && mcm.MovieId == movieId && mcm.IsConfirmed == null);

            if (movieCreatorMovie == null)
            {
                return false;
            }

            movieCreatorMovie.IsConfirmed = value;
            _dbContext.MovieCreatorMovies.Update(movieCreatorMovie);
            _dbContext.SaveChanges();
            return true;
        }
    }
}
