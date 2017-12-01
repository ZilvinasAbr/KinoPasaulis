using KinoPasaulis.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Repositories.Theather
{
    public interface IAnnouncementRepository
    {
        IEnumerable<Announcement> GetAnnouncements();
        Announcement GetAnnouncementById(int annoucementId);
        IEnumerable<Announcement> GetAnnouncementsByTheatherId(int id);
        void InsertAnnouncement(Announcement Event);
        bool DeleteAnnouncement(int annoucementId);
    }
}
