using System;
using System.Collections.Generic;
using System.Security.Claims;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/theathers/")]
    public class EventController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IUserService _userService;
        private readonly ApplicationDbContext _dbContext;
        private readonly ITheatherService _theaterService;

        public EventController(ITheatherService theaterService, IApplicationService applicationService, SignInManager<ApplicationUser> signInManager, IUserService userService, ApplicationDbContext dbContext)
        {
            _theaterService = theaterService;
            _userService = userService;
            _signInManager = signInManager;
            _dbContext = dbContext;
        }

        [HttpGet("statistics")]
        public IActionResult GetOrderStatistics(int id)
        {
            return Ok(_theaterService.GetOrderStatistics(id));
        }

        [HttpPost("addEvent")]
        public IActionResult AddEvent([FromBody] EventCreation eventCreation)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                var theather = _userService.GetTheatherByUserId(userId);
                eventCreation.Theather = theather;
                var created = _theaterService.AddNewEvent(eventCreation, userId);

                if (created)
                {
                    return Ok();
                }

                return BadRequest();
            }

            return Unauthorized();
        }

        [HttpGet("events")]
        public IEnumerable<Event> GetAllEvents()
        {
            return _theaterService.GetAllEvents();
        }

        [HttpGet("ThisWeekShows")]
        public IActionResult WeekShows(int eventId)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var time = DateTime.Now;

                return Ok(_dbContext.Shows
                    .Include(show => show.Event)
                    .ThenInclude(show => show.Movie)
                    .ThenInclude(show => show.Images)
                    .Include(show => show.Orders)
                    .Include(show => show.Auditorium)
                    .Where(show => show.Event.Id == eventId)
                    .Where(show => show.StartTime >= time && show.StartTime < time.AddDays(7))
                    .OrderBy(show => show.StartTime)
                    .ToList());
            }

            return Unauthorized();
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
            if (_signInManager.IsSignedIn(User))
            {
                return _theaterService.GetEventsByTheatherId(id);
            }

            return new List<Event>();
        }

        [HttpGet("getEvent")]
        public Event GetEventById(int id)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var Event = _theaterService.GetEventById(id);
                Event.Shows.Sort((x, y) => DateTime.Compare(x.StartTime, y.StartTime));
                return Event;
            }

            return new Event();
        }

        [HttpGet("getShow")]
        public Show GetShowById(int id)
        {
            return _theaterService.GetShowById(id);
        }

        [HttpDelete("deleteEvent")]
        public bool DeleteEvent([FromBody] int id)
        {
            return _theaterService.DeleteEvent(id);
        }

        [HttpPut("updateShow")]
        public bool UpdateShow([FromBody] Show show)
        {
            return _theaterService.UpdateShow(show);
        }

        [HttpDelete("deleteShow")]
        public bool DeleteShow([FromBody] int id)
        {
            return _theaterService.DeleteShow(id);
        }
    }
}

