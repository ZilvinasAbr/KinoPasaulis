using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models.ViewModel
{
    public class MovieStatisticsViewModel
    {
        public string Title { get; set; }
        public int EventsCount { get; set; }
        public double Rating { get; set; }
        public int OrdersBought { get; set; }
    }
}
