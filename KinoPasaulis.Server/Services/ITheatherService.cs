using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.ViewModels.Theather;

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

        bool SendAnnouncements(ISet<int> clientIds, string theatherId, string message);
        IEnumerable<Announcement> GetTheaterAnnouncments(string userId);
        bool DeleteAuditorium(int id);
        bool UpdateAutorium(Auditorium auditorium);
        bool UpdateShow(Show show);
        bool DeleteEvent(int id);
        bool DeleteShow(int id);

        IEnumerable<AuditoriumViewModel> GetMappedAuditoriums(IEnumerable<Auditorium> auditoriums);
    }
}
