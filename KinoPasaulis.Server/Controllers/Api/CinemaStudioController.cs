using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/cinemaStudio/")]
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

        [HttpGet("searchMovies/{query?}")]
        public IEnumerable<Movie> SearchMovies(string query)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var movies = _cinemaStudioService.SearchMovies(query);
                return movies;
            }

            return null;
        }

        [HttpPost("addMovie")]
        public IActionResult AddMovie([FromBody] AddMovieViewModel model)
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

            var movie = new Movie
            {
                Title = model.Title,
                ReleaseDate = model.ReleaseDate,
                Budget = model.Budget,
                Description = model.Description,
                Gross = model.Gross,
                Language = model.Language,
                AgeRequirement = model.AgeRequirement
            };

            var imageNames = model.ImageNames;

            _cinemaStudioService.AddNewMovie(movie, imageNames, HttpContext.User.GetUserId());

            return Ok(true);
        }

        [HttpDelete("deleteMovie/{id}")]
        public IActionResult DeleteMovie(int id)
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

            bool isSuccess = _cinemaStudioService.DeleteMovie(id, HttpContext.User.GetUserId());

            if (!isSuccess)
            {
                return NotFound();
            }

            return Ok();
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
    }
}