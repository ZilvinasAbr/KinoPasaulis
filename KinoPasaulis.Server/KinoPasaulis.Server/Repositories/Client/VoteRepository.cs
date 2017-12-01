using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.Client
{
    public class VoteRepository : IVoteRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public VoteRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Vote GetVoteById(int voteId)
        {
            var vote = _dbContext.Votes
                .SingleOrDefault(v => v.Id == voteId);

            return vote;
        }

        public void InsertVote(Vote vote)
        {
            _dbContext.Votes.Add(vote);
            _dbContext.SaveChanges();
        }

        public void UpdateVote(Vote vote)
        {
            _dbContext.Votes.Update(vote);
            _dbContext.SaveChanges();
        }
    }
}
