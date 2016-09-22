using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.Theather
{
    public interface IShowRepository : IDisposable
    {
        IEnumerable<Show> GetEvents();
        Show GetShowById(int showId);
        void InsertShow(Show show);
        void InsertShows(List<Show> shows);
        void DeleteShow(int showId);
        void UpdateShow(Show show);
    }
}
