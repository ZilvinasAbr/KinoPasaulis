using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Repositories.Theather
{
    public class ShowRepository : IShowRepository
    {
        private readonly ApplicationDbContext _context;
        public ShowRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public bool DeleteShow(int showId)
        {
            var show = _context.Shows.SingleOrDefault(x => x.Id == showId);
            if (show == null)
            {
                return false;
            }

            _context.Shows.Remove(show);
            _context.SaveChanges();

            return true;
        }

        public IEnumerable<Show> GetEvents()
        {
            return _context.Shows.ToList();
        }

        public Show GetShowById(int showId)
        {
            return _context.Shows
                .Include(x => x.Event.Movie)
                .Include(x => x.Auditorium)
                .Include(x => x.Orders)
                .Single(x => x.Id == showId);
        }

        public void InsertShow(Show show)
        {
            _context.Shows.Add(show);
            _context.SaveChanges();
        }

        public void InsertShows(List<Show> shows)
        {
            _context.Shows.AddRange(shows);
            _context.SaveChanges();
        }

        public void UpdateShow(Show show)
        {
            _context.Update(show);
            _context.SaveChanges();
        }

        public void DeleteAllShowsByEventId(int eventId)
        {
            var shows = _context.Shows.Where(x => x.Event.Id == eventId);

            _context.Shows.RemoveRange(shows);
            _context.SaveChanges();
        }
    }
}
