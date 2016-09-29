using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models.ViewModel
{
    public class EventCreation
    {
        public int MovieId { get; set; }
        public List<TimeSpan> Times { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public Theather Theather { get; set; }
        public List<int> AuditoriumIds { get; set; }
    }
}
