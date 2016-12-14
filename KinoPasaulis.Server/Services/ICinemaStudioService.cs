using System.Collections.Generic;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Services
{
    public interface ICinemaStudioService
    {
        IEnumerable<Movie> SearchMovies(string movieTitle);
        bool AddNewMovie(Movie movie, string userId);
    }
}
