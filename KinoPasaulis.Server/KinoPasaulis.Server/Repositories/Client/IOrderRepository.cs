using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.Client
{
    public interface IOrderRepository
    {
        Order GetOrderById(int orderId);
        void InsertOrder(Order order);
    }
}
