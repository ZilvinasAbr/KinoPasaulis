using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;

namespace KinoPasaulis.Server.Services
{
    public interface ITheatherService
    {
        void AddNewEvent(EventCreation eventCreation);
        void AddNewAuditorium(Auditorium auditorium);
    }
}
