using System;
using System.Collections.Generic;

namespace KinoPasaulis.Server.Models
{
    public class Voting
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public DateTime CreatedAt { get; set; }

        public List<MovieCreatorVoting> MovieCreatorVotings { get; set; }

        public int VotesAdminId { get; set; }

        public VotesAdmin VotesAdmin { get; set; }

        public List<Vote> Votes { get; set; }
    }
}
