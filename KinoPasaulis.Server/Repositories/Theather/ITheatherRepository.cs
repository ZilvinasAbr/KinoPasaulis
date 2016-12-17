using System;
using System.Collections.Generic;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Repositories.Theather
{
    public interface ITheatherRepository : IDisposable
    {
        Models.Theather GetTheatherById(int theatherId);
        IEnumerable<Models.Theather> GetTheathers();
    }
}
