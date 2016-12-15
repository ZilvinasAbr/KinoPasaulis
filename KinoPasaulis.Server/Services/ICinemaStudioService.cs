using System.Collections.Generic;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Services
{
    public interface ICinemaStudioService
    {
        IEnumerable<Movie> SearchMovies(string movieTitle);
        bool AddNewMovie(Movie movie, List<string> imageNames, List<Video> videos, List<MovieCreator> movieCreators , string userId);
        bool DeleteMovie(int id, string userId);
    }
}
