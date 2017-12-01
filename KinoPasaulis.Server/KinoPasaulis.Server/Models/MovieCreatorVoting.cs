using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models
{
    public class MovieCreatorVoting
    {
        public int MovieCreatorId { get; set; }
        public MovieCreator MovieCreator { get; set; }

        public int VotingId { get; set; }
        public Voting Voting { get; set; }
    }
}
