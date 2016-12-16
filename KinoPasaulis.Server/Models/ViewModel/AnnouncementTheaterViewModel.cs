using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models.ViewModel
{
    public class AnnouncementTheaterViewModel
    {
        public Client Client { get; set; }
        public DateTime Created { get; set; }
        public DateTime Sent { get; set; }
        public DateTime Seen { get; set; }
        public string Message { get; set; }
    }
}
