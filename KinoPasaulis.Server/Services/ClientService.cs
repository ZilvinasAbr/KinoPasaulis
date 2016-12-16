using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Repositories.Client;

namespace KinoPasaulis.Server.Services
{
    public class ClientService : IClientService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ISubscriptionRepository _subscriptionRepository;

        public ClientService(IOrderRepository orderRepository, ISubscriptionRepository subscriptionRepository)
        {
            _orderRepository = orderRepository;
            _subscriptionRepository = subscriptionRepository;
        }

        public Order GetOrderById(int orderId)
        {
            return _orderRepository.GetOrderById(orderId);
        }

        public Subscription GetSubscriptionById(int subscriptionId)
        {
            return _subscriptionRepository.GetSubscriptionById(subscriptionId);
        }


        public void AddOrder(Order order)
        {
            _orderRepository.InsertOrder(order);
        }

        public void AddSubscription(Subscription subscription)
        {
            _subscriptionRepository.InsertSubscription(subscription);
        }
    }
}
