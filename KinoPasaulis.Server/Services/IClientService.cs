﻿using System.Collections.Generic;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Services
{
    public interface IClientService
    {
        Order GetOrderById(int orderId);
        IEnumerable<Order> GetOrdersByClientId(int clientId);
        Subscription GetSubscriptionById(int subscriptionId);
        IEnumerable<Theather> GetSubscribedTheathers(int clientId);
        IEnumerable<Subscription> GetSubscriptions(int clientId);
        Vote GetVoteById(int voteId);
        Rating GetRatingById(int ratingId);
        IEnumerable<Rating> GetRatings(int clientId);
        IEnumerable<Vote> GetVotes(int clientId);
        IEnumerable<Movie> GetAllMovies();
        object GetMovie(int movieId);

        void AddOrder(Order order);
        void AddSubscription(Subscription subscription);
        void RemoveSubscription(Subscription subscription);
        void AddVote(Vote vote);
        void ChangeVote(Vote vote);
        void AddRating(Rating rating);
        void ChangeRating(Rating rating);
    }
}
