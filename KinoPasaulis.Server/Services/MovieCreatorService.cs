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

        public List<Movie> GetMovieCreatorPendingMovies(string userId)
        {
            var votesAdmin = _dbContext.Users
                .Include(u => u.MovieCreator)
                .SingleOrDefault(au => au.Id == userId)
                .MovieCreator;
            var movies = _dbContext.Movies./*Where(m => m.MovieCreatorMovies)*/ToList();
            return movies;
        }
    }
}
