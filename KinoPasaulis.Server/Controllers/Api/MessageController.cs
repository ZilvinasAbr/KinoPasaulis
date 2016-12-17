using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Services;
using KinoPasaulis.Server.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/[controller]")]
    public class MessageController : Controller
    {
        private readonly IMessageService _messageService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationDbContext _dbContext;

        public MessageController(IMessageService messageService, SignInManager<ApplicationUser> signInManager, ApplicationDbContext dbContext)
        {
            _messageService = messageService;
            _signInManager = signInManager;
            _dbContext = dbContext;
        }

        [HttpPost("addMessage")]
        public IActionResult CreateMessage([FromBody] MessageViewModel message)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();

                var newMessage = new Message
                {
                    CinemaStudioId = message.CinemaStudioId,
                    Text = message.Text
                };

                _messageService.AddMessage(newMessage, userId, message.CinemaStudioId);

                return Ok();
            }

            return Unauthorized();
        }

        [HttpGet("readMessages")]
        public IActionResult ReadMessages(int cinemaStudioId)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();

                return Ok(_messageService.GetCinemaStudioMessages(userId));
            }

            return Unauthorized();
        }
    }
}