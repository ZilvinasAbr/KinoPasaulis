using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.ViewModels;

namespace KinoPasaulis.Server.Services
{
    public interface IVotingService
    {
        IEnumerable<Voting> GetVotings();
        IEnumerable<Voting> GetCurrentVotings();
        IEnumerable<Voting> GetEndedVotings();
        Voting GetVotingById(int id);
        bool DeleteVoting(int id, string userId);
        bool AddVoting(Voting voting, List<MovieCreator> movieCreators, string userId);
        List<MovieCreator> GetMovieCreators(List<int> movieCreatorsId);
        List<MovieCreatorVoting> CreateMovieCreatorsVoting(/*IEnumerable<MovieCreator> movieCreators,*/ VotingViewModel voting);
        bool DeleteVoting(int votingId);
    }
}
