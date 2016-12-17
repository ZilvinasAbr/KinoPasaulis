using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.Client
{
    public class RatingRepository : IRatingRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public RatingRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Rating GetRatingById(int ratingId)
        {
            var rating = _dbContext.Ratings
                .SingleOrDefault(rat => rat.Id == ratingId);

            return rating;
        }

        public void InsertRating(Rating rating)
        {
            _dbContext.Ratings.Add(rating);
            _dbContext.SaveChanges();
        }

        public void UpdateRating(Rating rating)
        {
            _dbContext.Ratings.Update(rating);
            _dbContext.SaveChanges();
        }
    }
}
