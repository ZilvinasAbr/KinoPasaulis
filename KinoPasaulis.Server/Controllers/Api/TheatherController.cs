using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/theathers/")]
    public class TheatherController : Controller
    {
        private readonly ITheatherService _theatherService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IApplicationService _applicationService;

        public TheatherController(ITheatherService theatherService, UserManager<ApplicationUser> userManager, IApplicationService applicationService)
        {
            _theatherService = theatherService;
            _userManager = userManager;
            _applicationService = applicationService;
        }

        [HttpPost("addEvent")]
        public void AddEvent([FromBody] EventCreation eventCreation)
        {
            _theatherService.AddNewEvent(eventCreation);
        }

        [HttpPost("addAuditorium")]
        public async void AddAudotirum([FromBody] Auditorium auditorium)
        {
            var user = await _userManager.FindByIdAsync(HttpContext.User.GetUserId());
            var theather = _applicationService.GetTheatherByUserId(user.Id);

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

        [HttpGet("getShow")]
        public Show GetShowById(int id)
        {
            return _theatherService.GetShowById(id);
        }

        [HttpDelete("deleteAuditorium")]
        public bool DeleteAuditorium([FromBody] int id)
        {
            return _theatherService.DeleteAuditorium(id);
        }

        [HttpPut("updateAuditorium")]
        public bool UpdateAuditorium([FromBody] Auditorium auditorium)
        {
            return _theatherService.UpdateAutorium(auditorium);
        }

        [HttpDelete("deleteEvent")]
        public bool DeleteEvent([FromBody] int id)
        {
            return _theatherService.DeleteEvent(id);
        }

        [HttpPut("updateShow")]
        public bool UpdateShow([FromBody] Show show)
        {
            return _theatherService.UpdateShow(show);
        }

        [HttpDelete("deleteShow")]
        public bool DeleteShow([FromBody] int id)
        {
            return _theatherService.DeleteShow(id);
        }
    }
}