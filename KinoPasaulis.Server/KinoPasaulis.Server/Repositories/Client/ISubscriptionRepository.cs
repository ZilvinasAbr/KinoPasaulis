using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.Client
{
    public interface ISubscriptionRepository
    {
        Subscription GetSubscriptionById(int subscriptionId);
        IEnumerable<Models.Theather> GetSubscribedTheathersByClientId(int clientId);
        IEnumerable<Subscription> GetSubscriptions(int clientId);
        void InsertSubscription(Subscription subscription);
        IEnumerable<Subscription> GetTheaterSubscriptions(int theaterId);
        void UpdateSubscription(Subscription subscription);
    }
}
