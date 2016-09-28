using System;
using System.Collections.Generic;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.Theather
{
    public interface IAuditoriumRepository : IDisposable
    {
        IEnumerable<Auditorium> GetAuditoriums();
        Auditorium GetAuditoriumById(int auditoriumId);
        void InsertAuditorium(Auditorium auditorium);
        bool DeleteAudtorium(int auditoriumId);
        void UpdateAuditorium(Auditorium auditorium);
    }
}
