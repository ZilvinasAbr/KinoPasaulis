using System.Collections.Generic;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Services
{
    public interface IMovieCreatorService
    {
        IEnumerable<MovieCreator> GetMovieCreators();
        IEnumerable<Movie> GetMovieCreatorMovies(int id);
        List<JobAdvertisement> GetAllJobs();
        List<Movie> GetMovieCreatorPendingMovies(int id);
        bool SetIsConfirmed(string userId, bool value, int movieCreatorId, int movieId);
        IEnumerable<Voting> GetAwards(string userid);
        IEnumerable<object> GetAwardsStatistics();
    }
}
