using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/theathers/")]
    public class TheatherController : Controller
    {
        private readonly ITheatherService _theatherService;

        public TheatherController(ITheatherService theatherService)
        {
            _theatherService = theatherService;
        }

        [HttpPost("addEvent")]
        public void AddEvent([FromBody] EventCreation eventCreation)
        {
            _theatherService.AddNewEvent(eventCreation);
        }

        [HttpPost("addAuditorium")]
        public void AddAudotirum([FromBody] Auditorium auditorium)
        {
            _theatherService.AddNewAuditorium(auditorium);
        }

        [HttpGet("events")]
        public IEnumerable<Event> GetAllEvents()
        {
            return _theatherService.GetAllEvents();
        }

        [HttpGet("getEvent")]
        public Event GetEventById(int id)
        {
            return _theatherService.GetEventById(id);
        }
    }
}