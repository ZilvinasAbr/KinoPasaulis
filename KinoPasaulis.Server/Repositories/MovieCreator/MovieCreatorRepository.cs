using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Data;

namespace KinoPasaulis.Server.Repositories.MovieCreator
{
    public class MovieCreatorRepository : IMovieCreatorRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public MovieCreatorRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Models.MovieCreator GetMovieCreatorById(int movieCreatorId)
        {
            return _dbContext.MovieCreators
                .SingleOrDefault(x => x.Id == movieCreatorId);
        }
    }
}
