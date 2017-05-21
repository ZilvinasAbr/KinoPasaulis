using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.Services;
using KinoPasaulis.Server.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/[controller]")]
    public class JobAdvertisementController : Controller
    {
        private readonly IJobAdvertisementService _jobAdvertisementService;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public JobAdvertisementController(
            IJobAdvertisementService jobAdvertisementService,
            SignInManager<ApplicationUser> signInManager)
        {
            _jobAdvertisementService = jobAdvertisementService;
            _signInManager = signInManager;
        }

        [HttpGet("jobAdvertisements")]
        public IActionResult GetCinemaStudiosJobAdvertisements()
        {
            if (!_signInManager.IsSignedIn(User))
            {
                return Unauthorized();
            }

            var jobAdvertisements = _jobAdvertisementService.GetCinemaStudiosJobAdvertisements(HttpContext.User.GetUserId());

            return Ok(jobAdvertisements);
        }

        [HttpPost("addJobAdvertisement")]
        public IActionResult AddJobAdvertisement([FromBody] AddJobAdvertisementViewModel model)
        {
            if (!_signInManager.IsSignedIn(User))
            {
               return Unauthorized(); 
            }

            if (!ModelState.IsValid)
            {
                var allErrors = ModelState.Values.SelectMany(v => v.Errors.Select(b => b.ErrorMessage));

                return BadRequest(allErrors);
            }

            var isSuccess = _jobAdvertisementService.AddJobAdvertisement(model, HttpContext.User.GetUserId());

            return Ok(isSuccess);
        }

        [HttpDelete("jobAdvertisement/{id}")]
        public IActionResult DeleteJobAdvertisement(int id)
        {
            if (!_signInManager.IsSignedIn(User))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                var allErrors = ModelState.Values.SelectMany(v => v.Errors.Select(b => b.ErrorMessage));

                return BadRequest(allErrors);
            }

            bool isSuccess = _jobAdvertisementService.DeleteJobAdvertisement(id, HttpContext.User.GetUserId());

            if (!isSuccess)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}