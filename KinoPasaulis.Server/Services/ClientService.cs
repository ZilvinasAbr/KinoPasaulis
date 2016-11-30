using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Repositories.Client;

namespace KinoPasaulis.Server.Services
{
    public class ClientService : IClientService
    {
        private readonly IOrderRepository _orderRepository;

        public ClientService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public IEnumerable<Order> GetOrders()
        {
            return _orderRepository.GetOrders();
        }

        public Order GetOrderById(int orderId)
        {
            return _orderRepository.GetOrderById(orderId);
        }

        public bool DeleteOrder(int orderId)
        {
            return _orderRepository.DeleteOrder(orderId);
        }

        public bool UpdateOrder(Order order)
        {
            _orderRepository.UpdateOrder(order);

            return true;
        }
    }
}
