using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.ViewModels.Theather
{
    public class AnnouncementViewModel
    {
        public ISet<int> ClientIds { get; set; }
        public string Message { get; set; }
    }
}
