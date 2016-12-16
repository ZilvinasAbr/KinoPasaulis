using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models
{
    public class Voting
    {
        public int Id { get; set; }

        public int? VotesAdminId { get; set; }

        public VotesAdmin VotesAdmin { get; set; }

        public string Title { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime EditedAt { get; set; }

        public List<MovieCreatorVoting> MovieCreatorVotings { get; set; }
    }
}
