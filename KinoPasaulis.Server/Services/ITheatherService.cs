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
        IEnumerable<Theather> GetAllTheathers();
        IEnumerable<Event> GetEventsByTheatherId(int id);
        Show GetShowById(int id);
        StatisticsViewModel GetOrderStatistics(int id);

        bool SendAnnouncements(ISet<int> clientIds, string theatherId, string message);
        IEnumerable<Announcement> GetTheaterAnnouncments(string userId);
        IEnumerable<Client> GetTheaterSubscribers(string userId);
        Theather GetTheatherById(int id);
        bool DeleteAuditorium(int id);
        bool UpdateAutorium(Auditorium auditorium);
        bool UpdateShow(Show show);
        bool DeleteEvent(int id);
        bool DeleteShow(int id);

        IEnumerable<AuditoriumViewModel> GetMappedAuditoriums(IEnumerable<Auditorium> auditoriums);
    }
}
