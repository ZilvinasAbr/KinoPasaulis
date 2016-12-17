using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models.ViewModel
{
    public class ChangeRatingViewModel
    {
        public int RatingId { get; set; }
        public string Comment { get; set; }
        public int Value { get; set; }
    }
}
