using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models
{
    public class Announcement
    {
        public int Id { get; set; }
        public Client Client { get; set; }
        public Theather Theater { get; set; }
        public string Message { get; set; }
        public DateTime Created { get; set; }
        public DateTime Sent { get; set; }
        public DateTime? Seen { get; set; }
    }
}
