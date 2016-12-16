using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Services;
using KinoPasaulis.Server.ViewModels.Theather;
using Microsoft.AspNetCore.Mvc;
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
    }
}
