using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Services
{
    public class MovieCreatorService : IMovieCreatorService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IVotingService _votingService;

        public MovieCreatorService(ApplicationDbContext dbContext, IVotingService votingService)
        {
            _dbContext = dbContext;
            _votingService = votingService;
        }

        public IEnumerable<MovieCreator> GetMovieCreators()
        {
            var movieCreators = _dbContext.MovieCreators
                .ToList();

            return movieCreators;
        }

        public List<Movie> GetMovieCreatorPendingMovies(int id)
        {
            var movies = _dbContext.MovieCreatorMovies.Where(mc => mc.MovieCreatorId == id && mc.IsConfirmed == null)
                .Include(mc => mc.Movie)
                    .ThenInclude(mc => mc.Images)
                .Include(mc => mc.Movie)
                    .ThenInclude(mc => mc.CinemaStudio)
                    .ToList();

            var moviesList = movies.Select(movie => movie.Movie)
                .ToList();
            return moviesList;
        }

        public IEnumerable<Movie> GetMovieCreatorMovies(int id)
        {
            var movies = _dbContext.MovieCreatorMovies
                .Where(mc => mc.MovieCreatorId == id && mc.IsConfirmed == true)
                .Include(mc => mc.Movie)
                    .ThenInclude(mc => mc.Images)
                .Include(mc => mc.Movie)
                    .ThenInclude(mc => mc.CinemaStudio)
                    .ToList();

            var moviesList = movies.Select(movie => movie.Movie)
                .ToList();

            return moviesList;
        }

        public bool SetIsConfirmed(string userId, bool value, int movieCreatorId, int movieId)
        {
            var movieCreator2 = _dbContext.Users
                .Include(user => user.MovieCreator)
                .SingleOrDefault(user => user.Id == userId)
                ?.MovieCreator;


            var movieCreatorMovie = _dbContext.MovieCreatorMovies
                .SingleOrDefault(
                    mcm => mcm.MovieCreatorId == movieCreator2.Id && mcm.MovieId == movieId && mcm.IsConfirmed == null);

            if (movieCreatorMovie == null)
            {
                return false;
            }

            movieCreatorMovie.IsConfirmed = value;
            _dbContext.MovieCreatorMovies.Update(movieCreatorMovie);
            _dbContext.SaveChanges();
            return true;
        }

        public IEnumerable<Voting> GetAwards(string userid)
        {
            var movieCreator = _dbContext.Users
                .Include(user => user.MovieCreator)
                .SingleOrDefault(user => user.Id == userid)
                ?.MovieCreator;

            var votings = new List<Voting>();

            foreach (var voting in _votingService.GetAllVotings())
            {
                var group = voting.Votes.GroupBy(vot => vot.MovieCreator.Id).ToDictionary(g => g.Key, g => g.ToList());

                if (voting.Votes.Count != 0 && voting.EndDate < DateTime.Now)
                {
                    var winner = group.Values.OrderByDescending(g => g.Count).FirstOrDefault().FirstOrDefault().MovieCreator;

                    if (movieCreator.Id == winner.Id)
                    {
                        votings.Add(voting);
                    }
                }

            }

            return votings;
        }

        public IEnumerable<object> GetAwardsStatistics()
        {
            var result = new List<AwardsStatisticsViewModel>();
            var movieCreators = _dbContext.MovieCreators.ToList();

            foreach (var movieCreator in movieCreators)
            {

                var wins = 0;

                foreach (var voting in _votingService.GetEndedVotings())
                {
                    var group = voting.Votes.GroupBy(vot => vot.MovieCreator.Id)
                        .ToDictionary(g => g.Key, g => g.ToList());

                    if (voting.Votes.Count != 0)
                    {
                        var winner =
                            group.Values.OrderByDescending(g => g.Count).FirstOrDefault().FirstOrDefault().MovieCreator;

                        if (movieCreator.Id == winner.Id)
                        {
                            wins++;
                        }
                    }
                }
                if (wins > 0)
                {
                    AwardsStatisticsViewModel temp = new AwardsStatisticsViewModel(movieCreator,wins);

                    result.Add(temp);
                }
            }
            return result.OrderByDescending(res => res.Wins);
        }
    }
}
