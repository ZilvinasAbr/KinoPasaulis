using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.Client
{
    public interface IVoteRepository
    {
        Vote GetVoteById(int voteId);
        void InsertVote(Vote vote);
        void UpdateVote(Vote vote);
    }
}
