using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Repositories.Client;

namespace KinoPasaulis.Server.Services
{
    public class ClientService : IClientService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IVoteRepository _voteRepository;
        private readonly IRatingRepository _ratingRepository;

        public ClientService(IOrderRepository orderRepository, ISubscriptionRepository subscriptionRepository, IVoteRepository voteRepository, IRatingRepository ratingRepository)
        {
            _orderRepository = orderRepository;
            _subscriptionRepository = subscriptionRepository;
            _voteRepository = voteRepository;
            _ratingRepository = ratingRepository;
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
