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

        public IEnumerable<Voting> GetVotings()
        {
            IEnumerable<Voting> votings = _dbContext.Votings.ToList();

            return votings;
        }

        public IEnumerable<Voting> GetCurrentVotings()
        {
            IEnumerable<Voting> votings = _dbContext.Votings.Where
                (voting => voting.StartDate < DateTime.Now &&
                voting.EndDate > DateTime.Now).ToList();

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

        public bool AddVoting(Voting voting, List<MovieCreator> movieCreators, string userId)
        {
            var votingWithSameId = _dbContext.Votings.SingleOrDefault(v => v.Id == voting.Id);

            if (votingWithSameId != null)
            {
                return false;
            }

            voting.CreatedAt = DateTime.Now;

            var votesAdmin = _dbContext.Users
                .Include(u => u.VotesAdmin)
                .SingleOrDefault(au => au.Id == userId)
                .VotesAdmin;

            voting.VotesAdmin = votesAdmin;

            var movieCreatorVotings = new List<MovieCreatorVoting>();
            foreach (var movieCreator in movieCreators)
            {
                var movieCreatorVoting = new MovieCreatorVoting
                {
                    MovieCreatorId = movieCreator.Id,
                    Voting = voting
                };
                movieCreatorVotings.Add(movieCreatorVoting);
            }
            voting.MovieCreatorVotings = movieCreatorVotings;

            _dbContext.Votings.Add(voting);
            _dbContext.SaveChanges();

            return true;
        }

        public List<MovieCreator> GetMovieCreators(List<int> movieCreatorsId)
        {
            List<MovieCreator> movieCreators = new List<MovieCreator>();

            foreach(var movieCreatorId in movieCreatorsId)
            {
                MovieCreator movieCreator = _dbContext.MovieCreators.SingleOrDefault(mc => mc.Id == movieCreatorId);
                movieCreators.Add(movieCreator);
            }

            return movieCreators;
        }

        public List<MovieCreatorVoting> CreateMovieCreatorsVoting(IEnumerable<MovieCreator> movieCreators, VotingViewModel voting)
        {
            var newVoting = new Voting
            {
                CreatedAt = DateTime.Now,
                EndDate = voting.EndDate,
                StartDate = voting.StartDate,
                Title = voting.Title,
                VotesAdminId = 1
            };

            _dbContext.Votings.Add(newVoting);
            _dbContext.SaveChanges();
            var movieCreatorVotings = new List<MovieCreatorVoting>();

            foreach (var movieCreator in movieCreators)
            {
                var newMovieCreatorVoting = new MovieCreatorVoting
                {
                    MovieCreator = movieCreator,
                    Voting = newVoting
                };

                movieCreatorVotings.Add(newMovieCreatorVoting);
                _dbContext.MovieCreatorVotings.Add(newMovieCreatorVoting);
            }

            _dbContext.SaveChanges();

            return movieCreatorVotings;
        }

        public bool DeleteVoting(int votingId) // truksta balsu pasalinimo, virsuje galbut teisingai parasyta funkcija
        {
            var movieCreatorVotings = _dbContext.MovieCreatorVotings.Where(mcv => mcv.VotingId == votingId);
            var votes = _dbContext.Votes
                .Include(v => v.Voting)
                .Where(v => v.Voting.Id == votingId);

            if (movieCreatorVotings == null)
            {
                return false;
            }

            _dbContext.MovieCreatorVotings.RemoveRange(movieCreatorVotings);
            
            var voting = _dbContext.Votings.Single(obj => obj.Id == votingId);
            _dbContext.Votings.Remove(voting);
            _dbContext.SaveChanges();
            return true;
        }
    }
}

