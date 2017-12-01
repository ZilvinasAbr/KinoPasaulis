using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.Services;
using KinoPasaulis.Server.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Controllers.Api
{
  [Route("api/[controller]")]
  public class MovieController : Controller
  {
    private readonly ApplicationDbContext _dbContext;
    private readonly SignInManager<ApplicationUser> _signInManager;

    private readonly IMovieService _movieService;

    public MovieController(
        ApplicationDbContext dbContext,
        SignInManager<ApplicationUser> signInManager,
        IMovieService movieService)
    {
      _dbContext = dbContext;
      _signInManager = signInManager;
      _movieService = movieService;
    }

    [HttpGet("searchMovies/{query?}")]
    public IEnumerable<Movie> SearchMovies(string query)
    {
      if (_signInManager.IsSignedIn(User))
      {
        var movies = _movieService.SearchMovies(query);
        return movies;
      }

      return null;
    }

    [HttpPost]
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
        Duration = new TimeSpan(model.Hours, model.Minutes, 0),
        ReleaseDate = model.ReleaseDate,
        Budget = model.Budget,
        Description = model.Description,
        Gross = model.Gross,
        Language = model.Language,
        AgeRequirement = model.AgeRequirement
      };

      var imageNames = model.ImageNames;
      var imageTitles = model.ImageTitles;
      var imageDescriptions = model.ImageDescriptions;
      var videos = model.Videos;
      var movieCreators = model.MovieCreators;

      var isSuccess = _movieService.AddNewMovie(movie, imageNames, imageTitles, imageDescriptions, videos, movieCreators, HttpContext.User.GetUserId());

      return Ok(isSuccess);
    }

    [HttpDelete("{id}")]
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

      bool isSuccess = _movieService.DeleteMovie(id, HttpContext.User.GetUserId());

      if (!isSuccess)
      {
        return NotFound();
      }

      return Ok();
    }

    [HttpPut("{id}")]
    public IActionResult EditMovie([FromBody] AddMovieViewModel model, int id)
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
        Id = id,
        Title = model.Title,
        Duration = new TimeSpan(model.Hours, model.Minutes, 0),
        ReleaseDate = model.ReleaseDate,
        Budget = model.Budget,
        Description = model.Description,
        Gross = model.Gross,
        Language = model.Language,
        AgeRequirement = model.AgeRequirement
      };

      var videos = model.Videos;
      var movieCreators = model.MovieCreators;

      var isSuccess = _movieService.EditMovie(movie, videos, movieCreators, HttpContext.User.GetUserId());


      return Ok(isSuccess);
    }

    [HttpGet("newestMovies")]
    public IActionResult NewestMovies()
    {
      return Ok(_dbContext.Movies.Include(mv => mv.CinemaStudio).Include(mv => mv.Images).OrderByDescending(mv => mv.Id));
    }
  }
}