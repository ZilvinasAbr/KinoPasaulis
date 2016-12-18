using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using Microsoft.EntityFrameworkCore;
using NuGet.Versioning;

namespace KinoPasaulis.Server.Repositories.Client
{
    public class SubscriptionRepository : ISubscriptionRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public SubscriptionRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Subscription GetSubscriptionById(int subscriptionId)
        {
            var subscription = _dbContext.Subscriptions
                .SingleOrDefault(sub => sub.Id == subscriptionId);

            return subscription;
        }

        public IEnumerable<Models.Theather> GetSubscribedTheathersByClientId(int clientId)
        {
            var subscriptions = _dbContext
                .Subscriptions
                .Include(sb => sb.Client)
                .Include(sb => sb.Theather)
                .Where(sb => sb.Client.Id == clientId)
                .Where(sb => sb.EndDate == null);

            var list = new List<Models.Theather>();

            foreach (var subscription in subscriptions)
            {
                list.Add(subscription.Theather);
            }

            return list;
        }

        public IEnumerable<Subscription> GetSubscriptions(int clientId)
        {
            var subscriptions = _dbContext
                .Subscriptions
                .Include(sb => sb.Client)
                .Include(sb => sb.Theather)
                .Where(sb => sb.Client.Id == clientId)
                .Where(sb => sb.EndDate == null).ToList();

            return subscriptions;
        }

        public IEnumerable<Subscription> GetTheaterSubscriptions(int theaterId)
        {
            var subscriptions = _dbContext.Subscriptions
                .Where(sb => sb.Theather.Id == theaterId)
                .Include(sb => sb.Client);

            return subscriptions;
        }

        public void InsertSubscription(Subscription subscription)
        {
            _dbContext.Subscriptions.Add(subscription);
            _dbContext.SaveChanges();
        }

        public void UpdateSubscription(Subscription subscription)
        {
            _dbContext.Subscriptions.Update(subscription);
            _dbContext.SaveChanges();
        }
    }
}
