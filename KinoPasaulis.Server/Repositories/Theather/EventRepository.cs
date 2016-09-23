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
        public EventRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public void DeleteEvent(int eventId)
        {
            var Event = _context.Events.Single(x => x.Id == eventId);
            if (Event == null) throw new ArgumentNullException(nameof(Event));

            _context.Events.Remove(Event);
            _context.SaveChanges();
        }

        public Event GetEventById(int eventId)
        {
            return _context.Events
                .Include(x => x.Movie)
                .Include(x => x.Shows)
                .ThenInclude(x => x.Auditorium)
                .Single(x => x.Id == eventId);
        }

        public IEnumerable<Event> GetEvents()
        {
            return _context.Events
                .Include(x => x.Movie)
                .Include(x => x.Shows)
                .ThenInclude(x => x.Auditorium)
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
