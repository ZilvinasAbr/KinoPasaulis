using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/[controller]")]
    public class MovieCreatorController : Controller
    {
        private readonly IMovieCreatorService _movieCreatorService;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public MovieCreatorController(
            IMovieCreatorService movieCreatorService,
            SignInManager<ApplicationUser> signInManager )
        {
            _movieCreatorService = movieCreatorService;
            _signInManager = signInManager;
        }

        [HttpGet]
        public IEnumerable<MovieCreator> GetMovieCreators()
        {
            var movieCreators = _movieCreatorService.GetMovieCreators();

            return movieCreators;
        }
    }
}