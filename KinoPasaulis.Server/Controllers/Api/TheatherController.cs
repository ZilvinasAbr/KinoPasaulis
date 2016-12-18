using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.ViewModels.Theather;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/theathers/")]
    public class TheatherController : Controller
    {
        private readonly ITheatherService _theatherService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IUserService _userService;
        private readonly ApplicationDbContext _dbContext;

        public TheatherController(ITheatherService theatherService, IApplicationService applicationService, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IUserService userService, ApplicationDbContext dbContext)
        {
            _theatherService = theatherService;
            _userManager = userManager;
            _userService = userService;
            _signInManager = signInManager;
            _dbContext = dbContext;
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
        public bool AddAudotirum([FromBody] Auditorium auditorium)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                Theather theather = _userService.GetTheatherByUserId(userId);
                auditorium.Theather = theather;
                _theatherService.AddNewAuditorium(auditorium);

                return true;
            }

            return false;
        }

        [HttpGet("getTheatherAuditoriums")]
        public IEnumerable<AuditoriumViewModel> GetTheatherAuditoriums()
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                var theather = _userService.GetTheatherByUserId(userId);
                return _theatherService.GetMappedAuditoriums(theather.Auditoriums);
            }
            
            return new List<AuditoriumViewModel>();
        }

        [HttpGet("events")]
        public IEnumerable<Event> GetAllEvents()
        {
            return _theatherService.GetAllEvents();
        }

        [HttpGet("ThisWeekShows")]
        public IActionResult WeekShows(int eventId)
        {
            var time = DateTime.Now;

            return Ok(_dbContext.Shows
                .Include(show => show.Event)
                .Include(show => show.Auditorium)
                .Where(show => show.Event.Id == eventId)
                .Where(show => show.StartTime >= time && show.StartTime < time.AddDays(7))
                .OrderBy(show => show.StartTime)
                .ToList());
        }

        [HttpGet("getActiveTheatherEvents")]
        public IEnumerable<Event> GetTheatherEvents()
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                var theather = _userService.GetTheatherByUserIdIncludeEvents(userId);
                return theather.Events;
            }

            return new List<Event>();
        }

        [HttpGet("getTheatherEvents")]
        public IEnumerable<Event> GetEventsById(int id)
        {
            return _theatherService.GetEventsByTheatherId(id);
        }

        [HttpGet("getTheathers")]
        public IActionResult GetTheathers()
        {
            var theathers = _theatherService.GetAllTheathers();
            return Ok(theathers);
        }

        [HttpGet("getTheather")]
        public Theather GetTheatherById(int id)
        {
            var theather = _theatherService.GetTheatherById(id);
            return theather;
        }

        [HttpGet("getEvent")]
        public Event GetEventById(int id)
        {
            var Event = _theatherService.GetEventById(id);
            Event.Shows.Sort((x, y) => DateTime.Compare(x.StartTime, y.StartTime));
            return Event;
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