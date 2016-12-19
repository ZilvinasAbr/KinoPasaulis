using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Repositories.Client;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Services
{
    public class ClientService : IClientService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IVoteRepository _voteRepository;
        private readonly IRatingRepository _ratingRepository;
        private readonly ApplicationDbContext _dbContext;

        public ClientService(IOrderRepository orderRepository, ISubscriptionRepository subscriptionRepository, IVoteRepository voteRepository, IRatingRepository ratingRepository, ApplicationDbContext dbContext)
        {
            _orderRepository = orderRepository;
            _subscriptionRepository = subscriptionRepository;
            _voteRepository = voteRepository;
            _ratingRepository = ratingRepository;
            _dbContext = dbContext;
        }

        public Order GetOrderById(int orderId)
        {
            return _orderRepository.GetOrderById(orderId);
        }

        public Subscription GetSubscriptionById(int subscriptionId)
        {
            return _subscriptionRepository.GetSubscriptionById(subscriptionId);
        }

        public IEnumerable<Theather> GetSubscribedTheathers(int clientId)
        {
            return _subscriptionRepository.GetSubscribedTheathersByClientId(clientId);
        }

        public IEnumerable<Subscription> GetSubscriptions(int clientId)
        {
            return _subscriptionRepository.GetSubscriptions(clientId);
        }

        public Vote GetVoteById(int voteId)
        {
            return _voteRepository.GetVoteById(voteId);
        }

        public Rating GetRatingById(int ratingId)
        {
            return _ratingRepository.GetRatingById(ratingId);
        }

        public IEnumerable<Rating> GetRatings(int clientId)
        {
            var ratings = _dbContext
                .Ratings
                .Where(rt => rt.ClientId == clientId)
                .ToList();

            return ratings;
        }

        public IEnumerable<Movie> GetAllMovies()
        {
            return _dbContext.Movies
                .Include(mo => mo.Images)
                .ToList();
        }

        public object GetMovie(int movieId)
        {
            var movie = _dbContext.Movies
                .Include(m => m.MovieCreatorMovies)
                    .ThenInclude(mcm => mcm.MovieCreator)
                .Include(m => m.Images)
                .Include(m => m.Videos)
                .Include(m => m.CinemaStudio)
                .Include(m => m.Events)
                    .ThenInclude(e => e.Theather)
                .Include(m => m.Ratings)
                    .ThenInclude(m => m.Client)
                .SingleOrDefault(m => m.Id == movieId);

            var currentEvents = movie.Events.Where(e => e.StartTime <= DateTime.Now && DateTime.Now <= e.EndTime);
            var pastEvents = movie.Events.Where(e => e.EndTime < DateTime.Now);
            var movieCreators = movie.MovieCreatorMovies
                .Where(mcm => mcm.IsConfirmed != null && mcm.IsConfirmed.Value)
                .Select(creatorMovie => creatorMovie.MovieCreator);

            return new
            {
                PastEvents = pastEvents,
                CurrentEvents = currentEvents,
                movie.Id,
                movie.Title,
                movie.Images,
                movie.AgeRequirement,
                movie.Videos,
                movie.Budget,
                movie.Gross,
                movie.Description,
                movie.ReleaseDate,
                movie.Ratings,
                movie.JobAdvertisements,
                movie.Language,
                movie.Duration,
                movieCreators
            };
        }

        public void AddOrder(Order order)
        {
            _orderRepository.InsertOrder(order);
        }

        public void AddSubscription(Subscription subscription)
        {
            _subscriptionRepository.InsertSubscription(subscription);
        }

        public void RemoveSubscription(Subscription subscription)
        {
            _subscriptionRepository.UpdateSubscription(subscription);
        }

        public void AddVote(Vote vote)
        {
            _voteRepository.InsertVote(vote);
        }

        public void ChangeVote(Vote vote)
        {
            _voteRepository.UpdateVote(vote);
        }

        public void AddRating(Rating rating)
        {
            _ratingRepository.InsertRating(rating);
        }

        public void ChangeRating(Rating rating)
        {
            _ratingRepository.UpdateRating(rating);
        }
    }
}
