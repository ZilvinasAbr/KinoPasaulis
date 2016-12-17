using System.Collections.Generic;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Services
{
    public interface IClientService
    {
        Order GetOrderById(int orderId);
        Subscription GetSubscriptionById(int subscriptionId);
        Vote GetVoteById(int voteId);

        void AddOrder(Order order);
        void AddSubscription(Subscription subscription);
        void RemoveSubscription(Subscription subscription);
        void AddVote(Vote vote);
        void ChangeVote(Vote vote);
    }
}
