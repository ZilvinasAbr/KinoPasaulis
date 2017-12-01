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
    public class CinemaStudioController : Controller
    {
        private readonly ICinemaStudioService _cinemaStudioService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IHostingEnvironment _environment;

        public CinemaStudioController(
            ICinemaStudioService cinemaStudioService,
            SignInManager<ApplicationUser> signInManager,
            IHostingEnvironment environment)
        {
            _cinemaStudioService = cinemaStudioService;
            _signInManager = signInManager;
            _environment = environment;
        }

        [HttpGet("movies")]
        public IActionResult GetCinemaStudioMovies()
        {
            if (!_signInManager.IsSignedIn(User))
            {
                return Unauthorized();
            }

            var userId = HttpContext.User.GetUserId();

            var movies = _cinemaStudioService.GetCinemaStudioMovies(userId);

            return Ok(movies);
        }

        [HttpGet("movie/{id}")]
        public IActionResult GetCinemaStudioMovie(int id)
        {
            if (!_signInManager.IsSignedIn(User))
            {
                return Unauthorized();
            }

            var movie = _cinemaStudioService.GetCinemaStudioMovie(id, HttpContext.User.GetUserId());

            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }

        [HttpPost("uploadImage")]
        public async Task<IActionResult> UploadImage()
        {
            var files = Request.Form.Files;

            var uploads = Path.Combine(_environment.WebRootPath, "uploads");

            var fileNames = new List<string>();

            foreach(var file in files)
            {
                if (file.Length > 0)
                {
                    var fileName = Guid.NewGuid() + file.FileName;

                    using (var fileStream = new FileStream(Path.Combine(uploads, fileName), FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }

                    fileNames.Add(fileName);
                }
            }

            return Ok(fileNames);
        }

        [HttpGet("statistics")]
        public IActionResult GetCinemaStudiosStatistics()
        {
            var cinemaStudiosStatistics = _cinemaStudioService.GetCinemaStudiosStatistics();

            return Ok(cinemaStudiosStatistics);
        }

        [HttpGet("moviesStatistics")]
        public IActionResult GetCinemaStudiosMoviesStatistics()
        {
            if (!_signInManager.IsSignedIn(User))
            {
                return Unauthorized();
            }

            var moviesStatistics = _cinemaStudioService.GetCinemaStudiosMoviesStatistics(HttpContext.User.GetUserId());

            return Ok(moviesStatistics);
        }

        [HttpGet("specialties")]
        public IActionResult GetSpecialties()
        {
            if (!_signInManager.IsSignedIn(User))
            {
                return Unauthorized();
            }

            var specialties = _cinemaStudioService.GetSpecialties();

            return Ok(specialties);
        }
    }
}