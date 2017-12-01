using System.Collections.Generic;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Services
{
  public interface IMovieService
  {
    IEnumerable<Movie> SearchMovies(string movieTitle);
    bool AddNewMovie(
      Movie movie,
      List<string> imageNames,
      List<string> imageTitles,
      List<string> imageDescriptions,
      List<Video> videos,
      List<MovieCreator> movieCreators,
      string userId);
    bool DeleteMovie(int id, string userId);
    bool EditMovie(Movie movie, List<Video> videos, List<MovieCreator> movieCreators, string userId);
  }
}
