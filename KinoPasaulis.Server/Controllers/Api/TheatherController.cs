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
    public class AuditoriumController : Controller
    {
        private readonly ITheatherService _theatherService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IUserService _userService;

        public AuditoriumController(ITheatherService theatherService, IApplicationService applicationService, SignInManager<ApplicationUser> signInManager, IUserService userService)
        {
            _theatherService = theatherService;
            _userService = userService;
            _signInManager = signInManager;
        }

        [HttpPost("addAuditorium")]
        public bool AddAudotirum([FromBody] Auditorium auditorium)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                var theather = _userService.GetTheatherByUserId(userId);
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
    }
}