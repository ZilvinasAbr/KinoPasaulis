﻿using System;
using System.Collections.Generic;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.Theather
{
    public interface IEventRepository : IDisposable
    {
        IEnumerable<Event> GetEvents();
        Event GetEventById(int eventId);
        IEnumerable<Event> GetEventsByTheatherId(int id);
        void InsertEvent(Event Event);
        bool DeleteEvent(int eventId);
        void UpdateEvent(Event Event);
    }
}
