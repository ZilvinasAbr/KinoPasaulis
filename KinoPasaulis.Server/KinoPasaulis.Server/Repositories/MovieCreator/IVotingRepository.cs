using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.MovieCreator
{
    public interface IVotingRepository
    {
        Voting GetVotingById(int votingId);
    }
}
