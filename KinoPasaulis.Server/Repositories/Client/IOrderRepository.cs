using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.Client
{
    public interface IOrderRepository
    {
        IEnumerable<Order> GetOrders();
        Order GetOrderById(int movieId);
        void InsertOrder(Order order);
        bool DeleteOrder(int orderId);
        void UpdateOrder(Order order);
    }
}
