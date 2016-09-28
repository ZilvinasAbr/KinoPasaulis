using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;

namespace KinoPasaulis.Server.Services
{
    public interface ITheatherService
    {
        void AddNewEvent(EventCreation eventCreation);
        void AddNewAuditorium(Auditorium auditorium);
        IEnumerable<Event> GetAllEvents();
        Event GetEventById(int id);
        Show GetShowById(int id);

        bool DeleteAuditorium(int id);
        bool UpdateAutorium(Auditorium auditorium);
        bool UpdateShow(Show show);
        bool DeleteEvent(int id);
        bool DeleteShow(int id);
    }
}
