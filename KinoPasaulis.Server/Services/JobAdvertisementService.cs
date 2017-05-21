using System;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Services
{
  public class JobAdvertisementService : IJobAdvertisementService
  {
    private readonly ApplicationDbContext _dbContext;

    public JobAdvertisementService(ApplicationDbContext dbContext)
    {
      _dbContext = dbContext;
    }

    public bool AddJobAdvertisement(AddJobAdvertisementViewModel model, string userId)
    {
      var user = _dbContext.Users
          .Include(au => au.CinemaStudio)
              .ThenInclude(studio => studio.Movies)
          .SingleOrDefault(au => au.Id == userId);

      if (user == null)
      {
        return false;
      }

      var cinemaStudio = user.CinemaStudio;

      var movie = cinemaStudio.Movies.SingleOrDefault(m => m.Id == model.Movie.Id);
      var specialty = _dbContext.Specialties.SingleOrDefault(sp => sp.Id == model.Specialty.Id);

      if (movie == null || specialty == null)
      {
        return false;
      }

      var jobAdvertisement = new JobAdvertisement
      {
        Movie = movie,
        Specialty = specialty,
        Title = model.Title,
        Description = model.Description,
        Duration = model.Duration,
        PayRate = model.PayRate
      };

      specialty.Quantity++;
      _dbContext.JobAdvertisements.Add(jobAdvertisement);
      _dbContext.SaveChanges();

      return true;
    }

    public bool DeleteJobAdvertisement(int id, string userId)
    {
      var jobAdvertisement = _dbContext.JobAdvertisements
          .Include(jobAd => jobAd.Movie)
          .SingleOrDefault(jobAd => jobAd.Id == id);
      var cinemaStudio = _dbContext.Users
          .Include(u => u.CinemaStudio)
          .SingleOrDefault(au => au.Id == userId)
          .CinemaStudio;

      if (jobAdvertisement == null || cinemaStudio == null)
      {
        return false;
      }

      if (jobAdvertisement.Movie.CinemaStudioId != cinemaStudio.Id)
      {
        return false;
      }

      _dbContext.JobAdvertisements.Remove(jobAdvertisement);
      _dbContext.SaveChanges();

      return true;
    }

    public object GetCinemaStudiosJobAdvertisements(string userId)
    {
      var user = _dbContext.Users
          .Include(au => au.CinemaStudio)
              .ThenInclude(cinema => cinema.Movies)
                  .ThenInclude(movie => movie.JobAdvertisements)
                      .ThenInclude(jobAd => jobAd.Specialty)
          .SingleOrDefault(au => au.Id == userId);

      var cinemaStudio = user?.CinemaStudio;

      var jobAdvertisements = cinemaStudio?.Movies
          .SelectMany(movie => movie.JobAdvertisements)
          .Select(jobAd => new
          {
            jobAd.Id,
            jobAd.Title,
            jobAd.Duration,
            jobAd.PayRate,
            MovieTitle = jobAd.Movie.Title,
            SpecialtyTitle = jobAd.Specialty.Title
          });

      return jobAdvertisements;
    }
  }
}