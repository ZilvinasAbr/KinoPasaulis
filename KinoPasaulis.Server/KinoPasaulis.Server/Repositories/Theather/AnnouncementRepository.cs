using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Repositories.Theather
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly ApplicationDbContext _context;

        public AnnouncementRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool DeleteAnnouncement(int annoucementId)
        {
            var annoucement = _context.Announcements.SingleOrDefault(x => x.Id == annoucementId);

            if (annoucement == null)
            {
                return false;
            }

            _context.Announcements.Remove(annoucement);
            _context.SaveChanges();

            return true;
        }

        public Announcement GetAnnouncementById(int annoucementId)
        {
            var annoucement = _context.Announcements.SingleOrDefault(x => x.Id == annoucementId);

            return annoucement;
        }

        public IEnumerable<Announcement> GetAnnouncements()
        {
            return _context.Announcements;
        }

        public IEnumerable<Announcement> GetAnnouncementsByTheatherId(int id)
        {
            var annoucments = _context.Announcements.Where(an => an.Theater.Id == id);

            return annoucments;
        }

        public void InsertAnnouncement(Announcement announcement)
        {
            _context.Add(announcement);
            _context.SaveChanges();
        }
    }
}
