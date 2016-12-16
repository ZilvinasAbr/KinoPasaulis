using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models
{
    public class MovieCreatorSpecialty
    {
        public int MovieCreatorId { get; set; }
        public MovieCreator MovieCreator { get; set; }

        public int SpecialtyId { get; set; }
        public Specialty Specialty { get; set; }
    }
}
