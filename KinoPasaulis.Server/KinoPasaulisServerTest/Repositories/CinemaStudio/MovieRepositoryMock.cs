using System;
using System.Collections.Generic;
using System.Text;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Repositories.CinemaStudio;

namespace KinoPasaulisServerTest.Repositories.CinemaStudio
{
    class MovieRepositoryMock : IMovieRepository
    {
        public IEnumerable<Movie> GetMovies()
        {
            throw new NotImplementedException();
        }

        public Movie GetMovieById(int movieId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Movie> GetMoviesByTitle(string title)
        {
            throw new NotImplementedException();
        }

        public void InsertMovie(Movie movie)
        {
            throw new NotImplementedException();
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
