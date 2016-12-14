using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Repositories.CinemaStudio;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Services
{
    public class CinemaStudioService : ICinemaStudioService
    {
        private readonly IMovieRepository _movieRepository;
        private readonly ApplicationDbContext _dbContext;

        public CinemaStudioService(IMovieRepository movieRepository,
            ApplicationDbContext dbContext)
        {
            _movieRepository = movieRepository;
            _dbContext = dbContext;
        }

        public IEnumerable<Movie> SearchMovies(string movieTitle)
        {
            IEnumerable<Movie> movies = _movieRepository.GetMoviesByTitle(movieTitle);

            return movies;
        }

        public bool AddNewMovie(Movie movie, string userId)
        {
            var movieWithSameId = _dbContext.Movies.SingleOrDefault(m => m.Id == movie.Id);

            if (movieWithSameId != null)
            {
                return false;
            }

            var cinemaStudio = _dbContext.Users
                .Include(u => u.CinemaStudio)
                .SingleOrDefault(au => au.Id == userId)
                .CinemaStudio;

            movie.CinemaStudio = cinemaStudio;

            _dbContext.Movies.Add(movie);
            _dbContext.SaveChanges();

            return true;
        }
    }
}
