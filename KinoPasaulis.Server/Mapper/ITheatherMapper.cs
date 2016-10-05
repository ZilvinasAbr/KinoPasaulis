using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.ViewModels.Theather;

namespace KinoPasaulis.Server.Mapper
{
    public interface ITheatherMapper
    {
        AuditoriumViewModel MapOneAuditorium(Auditorium auditorium);
    }
}
