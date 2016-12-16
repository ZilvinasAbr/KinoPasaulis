using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.Services;
using KinoPasaulis.Server.ViewModels.Theather;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/announcement")]
    public class AnnouncementController : Controller
    {
        private readonly ITheatherService _theaterService;
        private readonly IUserService _userService;

        public AnnouncementController(ITheatherService theatherService, IUserService userService)
        {
            _theaterService = theatherService;
            _userService = userService;
        }

        [HttpPost]
        public IActionResult Post([FromBody] AnnouncementViewModel announcement)
        {
            var userId = HttpContext.User.GetUserId();

            if(userId == null)
            {
                return Unauthorized();
            }

            _theaterService.SendAnnouncement(announcement.ClientId, userId, announcement.Message);

            return Ok();
        }

        [HttpGet("messages")]
        public IActionResult GetTheatherMessages()
        {
            var userId = HttpContext.User.GetUserId();

            if (userId == null)
            {
                return Unauthorized();
            }

            var announcements = _theaterService.GetTheaterAnnouncments(userId);

            var messages = announcements.Select(annoucement => new AnnouncementTheaterViewModel
            {
                Client = annoucement.Client,
                Created = annoucement.Created,
                Message = annoucement.Message,
                Seen = annoucement.Seen,
                Sent = annoucement.Sent
            }).ToList();

            return Ok(messages);
        }
    }
}
