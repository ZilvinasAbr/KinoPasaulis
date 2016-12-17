using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.ViewModels
{
    public class ConfirmedViewModel
    {
        public bool Value { get; set; }
        public int MovieCreatorId { get; set; }
        public int MovieId { get; set; }
    }
}
