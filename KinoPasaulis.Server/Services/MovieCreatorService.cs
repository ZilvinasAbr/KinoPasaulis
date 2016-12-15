using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Services
{
    public class MovieCreatorService : IMovieCreatorService
    {
        ApplicationDbContext _dbContext;
        public MovieCreatorService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<MovieCreator> GetMovieCreators()
        {
            var movieCreators = _dbContext.MovieCreators
                .ToList();

            return movieCreators;
        }
    }
}
