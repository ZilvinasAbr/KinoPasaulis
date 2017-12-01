using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Repositories.Client
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public OrderRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Order GetOrderById(int orderId)
        {
            var order = _dbContext.Orders
                .SingleOrDefault(ord => ord.Id == orderId);

            return order;
        }

        public void InsertOrder(Order order)
        {
            _dbContext.Orders.Add(order);
            _dbContext.SaveChanges();
        }
    }
}
