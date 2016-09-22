using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.Theather
{
    public class ShowRepository : IShowRepository, IDisposable
    {
        private readonly ApplicationDbContext _context;
        public ShowRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public void DeleteShow(int showId)
        {
            var show = _context.Shows.SingleOrDefault(x => x.Id == showId);
            if (show == null) throw new ArgumentNullException(nameof(show));
            _context.Shows.Remove(show);
            _context.SaveChanges();
        }

        public IEnumerable<Show> GetEvents()
        {
            return _context.Shows.ToList();
        }

        public Show GetShowById(int showId)
        {
            return _context.Shows.SingleOrDefault(x => x.Id == showId);
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

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~ShowRepository() {
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
