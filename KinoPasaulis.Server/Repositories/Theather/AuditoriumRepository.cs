using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.Theather
{
    public class AuditoriumRepository : IAuditoriumRepository, IDisposable
    {
        private readonly ApplicationDbContext _context;
        public AuditoriumRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool DeleteAudtorium(int auditoriumId)
        {
            var auditorium = _context.Auditoriums.SingleOrDefault(x => x.Id == auditoriumId);

            if (auditorium == null)
            {
                return false;
            }

            _context.Auditoriums.Remove(auditorium);
            _context.SaveChanges();

            return true;
        }

        public Auditorium GetAuditoriumById(int auditoriumId)
        {
            return _context.Auditoriums.SingleOrDefault(x => x.Id == auditoriumId);
        }

        public List<Auditorium> GetAuditoriumsByIds(List<int> auditoriumIds)
        {
            return _context.Auditoriums
                .Where(aud => auditoriumIds.Contains(aud.Id))
                .ToList();
        }

        public IEnumerable<Auditorium> GetAuditoriums()
        {
            return _context.Auditoriums.ToList();
        }

        public void InsertAuditorium(Auditorium auditorium)
        {
            _context.Auditoriums.Add(auditorium);
            _context.SaveChanges();
        }

        public void UpdateAuditorium(Auditorium auditorium)
        {
            _context.Auditoriums.Update(auditorium);
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
        // ~AuditoriumRepository() {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        void IDisposable.Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion
    }
}
