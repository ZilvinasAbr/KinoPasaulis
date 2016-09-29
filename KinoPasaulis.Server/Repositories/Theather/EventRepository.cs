using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Repositories.Theather
{
    public class EventRepository : IEventRepository, IDisposable
    {
        private readonly ApplicationDbContext _context;
        private readonly IShowRepository _showRepository;
        public EventRepository(ApplicationDbContext context, IShowRepository showRepository)
        {
            _context = context;
            _showRepository = showRepository;
        }
        public bool DeleteEvent(int eventId)
        {
            var Event = _context.Events.Single(x => x.Id == eventId);

            if (Event == null)
            {
                return false;
            }
            _showRepository.DeleteAllShowsByEventId(eventId);
            _context.Events.Remove(Event);
            _context.SaveChanges();

            return true;
        }

        public Event GetEventById(int eventId)
        {
            return _context.Events
                .Include(x => x.Movie)
                .Include(x => x.Shows)
                    .ThenInclude(x => x.Auditorium)
                .Include(x => x.Shows)
                    .ThenInclude(x => x.Orders)
                .Single(x => x.Id == eventId);
        }

        public IEnumerable<Event> GetEventsByTheatherId(int id)
        {
            return _context.Events
                .Include(x => x.Movie)
                .Include(x => x.Shows)
                    .ThenInclude(x => x.Auditorium)
                .Include(x => x.Shows)
                    .ThenInclude(x => x.Orders)
                .Where(x => x.Theather.Id == id)
                .ToList();
        }

        public IEnumerable<Event> GetEvents()
        {
            return _context.Events
                .Include(x => x.Movie)
                .Include(x => x.Shows)
                    .ThenInclude(x => x.Auditorium)
                .Include(x => x.Shows)
                    .ThenInclude(x => x.Orders)
                .ToList();
        }

        public void InsertEvent(Event Event)
        {
            _context.Events.Add(Event);
            _context.SaveChanges();
        }

        public void UpdateEvent(Event Event)
        {
            _context.Events.Update(Event);
            _context.SaveChanges();
        }

        #region IDisposable Support
        private bool _disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                _disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~EventRepository() {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }

        #endregion
    }
}
