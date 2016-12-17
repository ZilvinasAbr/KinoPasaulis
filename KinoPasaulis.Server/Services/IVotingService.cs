using System.Collections.Generic;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Services
{
    public interface IVotingService
    {
        IEnumerable<Voting> GetVotings();
        IEnumerable<Voting> GetCurrentVotings();
        Voting GetVotingById(int id);
        bool DeleteVoting(int id, string userId);
        bool AddVoting(Voting voting, List<MovieCreator> movieCreators, string userId);
    }
}
