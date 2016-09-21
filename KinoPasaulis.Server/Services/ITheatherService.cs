using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models.ViewModel;

namespace KinoPasaulis.Server.Services
{
    public interface ITheatherService
    {
        void AddNewEvent(EventCreation eventCreation);
    }
}
