using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Services
{
    public class VotingService : IVotingService
    {
        private readonly ApplicationDbContext _dbContext;

        public VotingService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Voting> GetVotings(string userId)
        {
            var votesAdmin = _dbContext.Users
                .Include(u => u.VotesAdmin)
                .SingleOrDefault(au => au.Id == userId)
                .VotesAdmin;

            IEnumerable<Voting> votings = _dbContext.Votings
                .Where(id => id.VotesAdminId == votesAdmin.Id)
                .Include(mc => mc.Votes)
                .Include(mc => mc.MovieCreatorVotings)
                    .ThenInclude(mc => mc.MovieCreator)
                .ToList();

            return votings;
        }

        public IEnumerable<Voting> GetAllVotings()
        {
            IEnumerable<Voting> votings = _dbContext.Votings
                .Include(mc => mc.Votes)
                .Include(mc => mc.MovieCreatorVotings)
                    .ThenInclude(mc => mc.MovieCreator)
                .ToList();

            return votings;
        }

        public IEnumerable<Voting> GetCurrentVotings()
        {
            IEnumerable<Voting> votings = _dbContext.Votings
                .Where(voting => voting.StartDate < DateTime.Now &&
                voting.EndDate > DateTime.Now)
                .Include(v => v.Votes)
                .Include(v => v.MovieCreatorVotings)
                    .ThenInclude(v => v.MovieCreator)
                .ToList();

            return votings;
        }

        public IEnumerable<Voting> GetEndedVotings()
        {
            IEnumerable<Voting> votings = _dbContext.Votings
                .Where(voting => voting.StartDate < DateTime.Now &&
                voting.EndDate < DateTime.Now)
                .Include(v => v.Votes)
                .Include(v => v.MovieCreatorVotings)
                    .ThenInclude(v => v.MovieCreator)
                .ToList();

            return votings;
        }

        public Voting GetVotingById(int id)
        {
            var voting = _dbContext.Votings
                .SingleOrDefault(v => v.Id == id);

            return voting;
        }

        public bool DeleteVoting(int id, string userId)
        {
            var voting = _dbContext.Votings
                .Include(v => v.Votes)
                .Include(v => v.MovieCreatorVotings)
                .Include(v => v.Votes)
                .SingleOrDefault(v => v.Id == id);
            var votesAdmin = _dbContext.Users
                .Include(u => u.VotesAdmin)
                .SingleOrDefault(au => au.Id == userId)
                .VotesAdmin;

            if (voting == null || votesAdmin == null)
            {
                return false;
            }

            if (voting.VotesAdminId != votesAdmin.Id)
            {
                return false;
            }

            _dbContext.Votes.RemoveRange(voting.Votes);
            _dbContext.MovieCreatorVotings.RemoveRange(voting.MovieCreatorVotings);
            _dbContext.Votings.Remove(voting);
            _dbContext.SaveChanges();

            return true;
        }

        /*public List<MovieCreator> GetMovieCreators(List<int> movieCreatorsId)
        {
            List<MovieCreator> movieCreators = new List<MovieCreator>();

            foreach(var movieCreatorId in movieCreatorsId)
            {
                MovieCreator movieCreator = _dbContext.MovieCreators.SingleOrDefault(mc => mc.Id == movieCreatorId);
                movieCreators.Add(movieCreator);
            }

            return movieCreators;
        }*/

        public void AddVoting(VotingViewModel voting, string userId)
        {
            var votesAdmin = _dbContext.Users
                .Include(u => u.VotesAdmin)
                .SingleOrDefault(au => au.Id == userId)
                .VotesAdmin;

            if (voting.StartDate < DateTime.Now)
            {
                voting.StartDate = DateTime.Now;
            }

            var newVoting = new Voting
            {
                CreatedAt = DateTime.Now,
                EndDate = voting.EndDate,
                StartDate = voting.StartDate,
                Title = voting.Title,
                VotesAdminId = votesAdmin.Id
            };

            _dbContext.Votings.Add(newVoting);

            var movieCreatorVotings = new List<MovieCreatorVoting>();

            foreach (var movieCreator in voting.MovieCreators)
            {
                var newMovieCreatorVoting = new MovieCreatorVoting
                {
                    MovieCreatorId = movieCreator.Id,
                    VotingId = newVoting.Id
                };

                movieCreatorVotings.Add(newMovieCreatorVoting);
                
            }

            _dbContext.MovieCreatorVotings.AddRange(movieCreatorVotings);
            _dbContext.SaveChanges();

        }

    }
}

