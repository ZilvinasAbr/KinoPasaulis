using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _dbContext;

        public UserService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Theather GetTheatherByUserId(string id)
        {
            return _dbContext
                .Users
                .Include(x => x.Theather)
                .SingleOrDefault(x => x.Id == id)
                .Theather;
        }
    }
}
