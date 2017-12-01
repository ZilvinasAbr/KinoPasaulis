using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.CinemaStudio
{
    public class MovieRepository : IMovieRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public MovieRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Movie> GetMovies()
        {
            throw new NotImplementedException();
        }

        public Movie GetMovieById(int movieId)
        {
            var movie = _dbContext.Movies
                .SingleOrDefault(mv => mv.Id == movieId);

            return movie;
        }

        public IEnumerable<Movie> GetMoviesByTitle(string title)
        {
            IEnumerable<Movie> result;

            if(string.IsNullOrEmpty(title))
            {
                result = _dbContext.Movies.ToList();
            }else
            {
                result = _dbContext.Movies
                    .Where(movie => movie.Title.Contains(title))
                    .ToList();
            }

            return result;
        }

        public void InsertMovie(Movie movie)
        {
            _dbContext.Movies.Add(movie);
            _dbContext.SaveChanges();
        }

        public bool DeleteMovie(int movieId)
        {
            throw new NotImplementedException();
        }

        public void UpdateMovie(Movie movie)
        {
            throw new NotImplementedException();
        }
    }
}
