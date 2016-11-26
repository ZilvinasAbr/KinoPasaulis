using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Repositories.CinemaStudio;

namespace KinoPasaulis.Server.Services
{
    public class CinemaStudioService : ICinemaStudioService
    {
        private readonly IMovieRepository _movieRepository;

        public CinemaStudioService(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }

        public IEnumerable<Movie> SearchMovies(string movieTitle)
        {
            IEnumerable<Movie> movies = _movieRepository.GetMoviesByTitle(movieTitle);

            return movies;
        }
    }
}
