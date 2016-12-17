using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models
{
    public class Vote
    {
        public int Id { get; set; }
        public MovieCreator MovieCreator { get; set; }
        public DateTime VotedOn { get; set; }
        public DateTime VoteChangedOn { get; set; }
        public Client Client { get; set; }
        public Voting Voting { get; set; }
    }
}
