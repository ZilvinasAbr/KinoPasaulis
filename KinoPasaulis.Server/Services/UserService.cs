using System.Linq;
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
                    .ThenInclude(x => x.Auditoriums)
                .SingleOrDefault(x => x.Id == id)
                .Theather;
        }

        public Theather GetTheatherByUserIdIncludeEvents(string id)
        {
            return _dbContext
                .Users
                .Include(x => x.Theather)
                    .ThenInclude(x => x.Events)
                        .ThenInclude(x => x.Movie)
                .SingleOrDefault(x => x.Id == id)
                .Theather;
        }

        public Client GetClientById(int id)
        {
            return _dbContext.Clients.Single(cl => cl.Id == id);
        }

        
        public Client GetClientByUserId(string id)
        {
            return _dbContext
                .Users
                .Include(x => x.Client)
                .SingleOrDefault(x => x.Id == id)
                .Client;
        }
    }
}
