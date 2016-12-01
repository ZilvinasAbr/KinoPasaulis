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

        public IEnumerable<Order> GetOrders()
        {
            return _dbContext.Orders
                .Include(x => x.Client)
                .Include(x => x.Show.Auditorium.Theather)
                .Include(x => x.Show.Event.Movie)
                .ToList();
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

        public bool DeleteOrder(int orderId)
        {
            var order = _dbContext.Orders.Single(x => x.Id == orderId);
            if (order == null)
            {
                return false;
            }
            _dbContext.Orders.Remove(order);
            _dbContext.SaveChanges();

            return true;
        }

        public void UpdateOrder(Order order)
        {
            _dbContext.Update(order);
            _dbContext.SaveChanges();
        }
    }
}
