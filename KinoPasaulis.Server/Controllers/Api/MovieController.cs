using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/[controller]")]
    public class MovieController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public MovieController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("newestMovies")]
        public IActionResult NewestMovies()
        {
            return Ok(_dbContext.Movies.Include(mv => mv.CinemaStudio).Include(mv => mv.Images).OrderByDescending(mv => mv.Id));
        }
    }
}