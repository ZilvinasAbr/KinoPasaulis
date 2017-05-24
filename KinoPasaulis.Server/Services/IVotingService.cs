using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.ViewModels;

namespace KinoPasaulis.Server.Services
{
    public interface IVotingService
    {
        IEnumerable<Voting> GetVotings(string userId);
        IEnumerable<Voting> GetAllVotings();
        IEnumerable<Voting> GetCurrentVotings();
        IEnumerable<Voting> GetEndedVotings();
        Voting GetVotingById(int id);
        bool DeleteVoting(int id, string userId);
        //List<MovieCreator> GetMovieCreators(List<int> movieCreatorsId);
        void AddVoting(VotingViewModel voting, string userId);
    }
}
