using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models
{
    public class Subscription
    {
        public int Id { get; set; }
        public Theather Theather { get; set; }
        public Client Client { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EndDate { get; set; }
        public double Period { get; set; }
    }
}
