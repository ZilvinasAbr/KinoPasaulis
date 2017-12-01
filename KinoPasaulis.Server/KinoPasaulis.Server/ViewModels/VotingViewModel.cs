using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.ViewModels
{
    public class VotingViewModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public DateTime CreatedAt { get; set; }

        //public List<int> MovieCreatorsId { get; set; }
        public List<MovieCreator> MovieCreators { get; set; }
    }
}
