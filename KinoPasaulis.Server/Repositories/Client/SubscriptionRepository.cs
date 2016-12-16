using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using Microsoft.EntityFrameworkCore;

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
    }
}
