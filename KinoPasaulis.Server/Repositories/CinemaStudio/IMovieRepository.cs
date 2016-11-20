using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.CinemaStudio
{
    public interface IMovieRepository
    {
        IEnumerable<Movie> GetMovies();
        Movie GetMovieById(int movieId);
        IEnumerable<Movie> GetMoviesByTitle(string title);
        void InsertMovie(Movie movie);
        bool DeleteMovie(int movieId);
        void UpdateMovie(Movie movie);
    }
}
