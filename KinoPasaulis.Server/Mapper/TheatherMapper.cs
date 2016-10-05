using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.ViewModels.Theather;

namespace KinoPasaulis.Server.Mapper
{
    public class TheatherMapper : ITheatherMapper
    {
        public AuditoriumViewModel MapOneAuditorium(Auditorium auditorium)
        {
            var viewModel = new AuditoriumViewModel
            {
                Id = auditorium.Id,
                Name = auditorium.Name,
                Seats = auditorium.Seats
            };

            return viewModel;
        }
    }
}
