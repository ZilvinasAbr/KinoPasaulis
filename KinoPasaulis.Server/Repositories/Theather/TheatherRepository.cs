using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.Theather
{
    public class TheatherRepository : ITheatherRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public TheatherRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Models.Theather GetTheatherByUserId(string id)
        {
            return _dbContext
                .Theathers
                .SingleOrDefault(x => x.UserId == id);
        }
    }
}
