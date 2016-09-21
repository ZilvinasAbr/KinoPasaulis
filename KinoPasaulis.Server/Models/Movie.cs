using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public TimeSpan RunTime { get; set; }
        // KRC NE MANO POSISTEME :)))))) Kurkit Enumus i filmu ratingus (PG-13 ir tt.. zanrus)
    }
}
