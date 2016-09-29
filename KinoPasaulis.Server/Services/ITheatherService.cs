using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;

namespace KinoPasaulis.Server.Services
{
    public interface ITheatherService
    {
        void AddNewEvent(EventCreation eventCreation);
        void AddNewAuditorium(Auditorium auditorium);
        Event GetEventById(int id);
        IEnumerable<Event> GetAllEvents();
        IEnumerable<Event> GetEventsByTheatherId(int id);
        Show GetShowById(int id);

        bool DeleteAuditorium(int id);
        bool UpdateAutorium(Auditorium auditorium);
        bool UpdateShow(Show show);
        bool DeleteEvent(int id);
        bool DeleteShow(int id);
    }
}
