using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/cinemaStudio/")]
    public class CinemaStudioController : Controller
    {
        private readonly ICinemaStudioService _cinemaStudioService;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public CinemaStudioController(
            ICinemaStudioService cinemaStudioService,
            SignInManager<ApplicationUser> signInManager )
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
    }
}