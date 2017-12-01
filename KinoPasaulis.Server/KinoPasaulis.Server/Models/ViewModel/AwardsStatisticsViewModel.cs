using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models.ViewModel
{
    public class AwardsStatisticsViewModel
    {
        public AwardsStatisticsViewModel(MovieCreator movieCreator, int wins)
        {
            MovieCreator = movieCreator;
            Wins = wins;
        }
        public MovieCreator MovieCreator { get; set; }
        public int Wins { get; set; }
    }
}
