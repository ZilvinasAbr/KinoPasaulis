using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using Microsoft.AspNetCore.Http;

namespace KinoPasaulis.Server.Services
{
    public interface ICinemaStudioService
    {
        IEnumerable<Movie> SearchMovies(string movieTitle);
        bool AddNewMovie(Movie movie, List<string> imageNames, string userId);
        bool DeleteMovie(int id, string userId);
    }
}
