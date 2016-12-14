using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/cinemaStudio/")]
    public class CinemaStudioController : Controller
    {
        private readonly ICinemaStudioService _cinemaStudioService;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public CinemaStudioController(
            ICinemaStudioService cinemaStudioService,
            SignInManager<ApplicationUser> signInManager)
        {
            _cinemaStudioService = cinemaStudioService;
            _signInManager = signInManager;
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
        public IActionResult AddMovie([FromBody] Movie movie)
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

            _cinemaStudioService.AddNewMovie(movie, HttpContext.User.GetUserId());

            return Ok(true);
        }
    }
}