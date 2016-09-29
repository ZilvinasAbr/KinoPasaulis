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
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IUserService _userService;

        public TheatherController(ITheatherService theatherService, IApplicationService applicationService, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IUserService userService)
        {
            _theatherService = theatherService;
            _userManager = userManager;
            _userService = userService;
            _signInManager = signInManager;
        }

        [HttpPost("addEvent")]
        public void AddEvent([FromBody] EventCreation eventCreation)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                Theather theather = _userService.GetTheatherByUserId(userId);
                eventCreation.Theather = theather;
                _theatherService.AddNewEvent(eventCreation);
            }
        }

        [HttpPost("addAuditorium")]
        public void AddAudotirum([FromBody] Auditorium auditorium)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                Theather theather = _userService.GetTheatherByUserId(userId);
                auditorium.Theather = theather;
                _theatherService.AddNewAuditorium(auditorium);
            }
        }

        [HttpGet("events")]
        public IEnumerable<Event> GetAllEvents()
        {
            return _theatherService.GetAllEvents();
        }

        [HttpGet("getTheatherEvents")]
        public IEnumerable<Event> GetEventsById(int id)
        {
            return _theatherService.GetEventsByTheatherId(id);
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