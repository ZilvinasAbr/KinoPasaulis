using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.MovieCreator
{
    public class VotingRepository : IVotingRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public VotingRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Voting GetVotingById(int votingId)
        {
            var voting = _dbContext.Votings
                .SingleOrDefault(vo => vo.Id == votingId);

            return voting;
        }
    }
}
