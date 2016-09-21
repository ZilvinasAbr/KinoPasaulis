using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models
{
    public class Show
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public List<Auditorium> Auditoriums { get; set; }
        public List<Order> Orders { get; set; }
    }
}
