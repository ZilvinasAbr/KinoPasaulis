using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.ViewModels.Theather
{
    public class StatisticsViewModel
    {
        public int TotalSeats { get; set; }
        public int OrderedSeats { get; set; }
        public int TotalSeatsEndedShows { get; set; }
        public int OrderedSeatsEndedShows { get; set; }
        public TimeSpan Time { get; set; }
        public bool ShowingNow { get; set; }
        public bool Over { get; set; }
    }
}
