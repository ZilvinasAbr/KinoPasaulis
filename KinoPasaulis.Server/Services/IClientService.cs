using System.Collections.Generic;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Services
{
    public interface IClientService
    {
        IEnumerable<Order> GetOrders();
        Order GetOrderById(int orderId);
        bool DeleteOrder(int orderId);
        bool UpdateOrder(Order order);
    }
}
