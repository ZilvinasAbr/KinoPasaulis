using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class MovieCreatorController : Controller
    {
        private readonly IMovieCreatorService _movieCreatorService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationDbContext _dbContext;

        public MovieCreatorController(
            IMovieCreatorService movieCreatorService,
            SignInManager<ApplicationUser> signInManager,
            ApplicationDbContext dbContext)
        {
            _movieCreatorService = movieCreatorService;
            _signInManager = signInManager;
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<MovieCreator> GetMovieCreators()
        {
            var movieCreators = _movieCreatorService.GetMovieCreators();

            return movieCreators;
        }

        [HttpGet("movies")]
        public IEnumerable<Movie> GetMovieCreatorMovies(int id)
        {
            var movies = _movieCreatorService.GetMovieCreatorMovies(id);

            return movies;
        }

        [HttpGet("pendingMovies")]
        public IEnumerable<Movie> GetMovieCreatorPendingMovies(int id)
        {
            var movies = _movieCreatorService.GetMovieCreatorPendingMovies(id);

            return movies;
        }

        [HttpPost("setMovie")]
        public bool SetIsConfirmed([FromBody] ConfirmedViewModel confirm)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();

                return _movieCreatorService.SetIsConfirmed(userId, confirm.Value, confirm.MovieCreatorId, confirm.MovieId);
            }

            return false;
        }

        [HttpGet("getJobs")]
        public IActionResult GetAllJobs()
        {
            return Ok(_dbContext.JobAdvertisements
                .Include(jb => jb.Specialty)
                .Include(jb => jb.Movie)
                    .ThenInclude(jb => jb.Images)
                .ToList());
        }
    }
}