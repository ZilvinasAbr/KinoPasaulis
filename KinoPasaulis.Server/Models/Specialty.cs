using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models
{
    public class Specialty
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int Quantity { get; set; }

        public DateTime CreatedAt { get; set; }

        public List<JobAdvertisement> JobAdvertisements { get; set; }
        public List<MovieCreator> MovieCreators {get; set;}
    }
}
