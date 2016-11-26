using System;
using System.Collections.Generic;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.Theather
{
    public interface IShowRepository : IDisposable
    {
        IEnumerable<Show> GetEvents();
        Show GetShowById(int showId);
        void InsertShow(Show show);
        void InsertShows(List<Show> shows);
        bool DeleteShow(int showId);
        void DeleteAllShowsByEventId(int eventId);
        void UpdateShow(Show show);
    }
}
