using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.Client
{
    public interface IRatingRepository
    {
        Rating GetRatingById(int ratingId);
        void InsertRating(Rating rating);
        void UpdateRating(Rating rating);
    }
}
