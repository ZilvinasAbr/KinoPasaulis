using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Repositories.CinemaStudio;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Services
{
    public class CinemaStudioService : ICinemaStudioService
    {
        private readonly IMovieRepository _movieRepository;
        private readonly ApplicationDbContext _dbContext;
        private readonly IHostingEnvironment _environment;

        public CinemaStudioService(IMovieRepository movieRepository,
            ApplicationDbContext dbContext,
            IHostingEnvironment environment)
        {
            _movieRepository = movieRepository;
            _dbContext = dbContext;
            _environment = environment;
        }

        public IEnumerable<Movie> SearchMovies(string movieTitle)
        {
            IEnumerable<Movie> movies = _movieRepository.GetMoviesByTitle(movieTitle);

            return movies;
        }

        public bool AddNewMovie(Movie movie, List<string> imageNames, string userId)
        {
            var movieWithSameId = _dbContext.Movies.SingleOrDefault(m => m.Id == movie.Id);

            if (movieWithSameId != null)
            {
                return false;
            }

            var images = new List<Image>();
            foreach (var imageName in imageNames)
            {
                var image = new Image
                {
                    CreatedOn = DateTime.Now,
                    Description = "Empty",
                    Title = "Empty",
                    Url = imageName
                };

                images.Add(image);
            }

            var cinemaStudio = _dbContext.Users
                .Include(u => u.CinemaStudio)
                .SingleOrDefault(au => au.Id == userId)
                .CinemaStudio;

            movie.CinemaStudio = cinemaStudio;
            movie.Images = images;

            _dbContext.Movies.Add(movie);
            _dbContext.SaveChanges();

            return true;
        }

        public bool DeleteMovie(int id, string userId)
        {
            var movie = _dbContext.Movies
                .Include(m => m.Images)
                .SingleOrDefault(m => m.Id == id);
            var cinemaStudio = _dbContext.Users
                .Include(u => u.CinemaStudio)
                .SingleOrDefault(au => au.Id == userId)
                .CinemaStudio;

            if (movie == null || cinemaStudio == null)
            {
                return false;
            }

            if (movie.CinemaStudioId != cinemaStudio.Id)
            {
                return false;
            }


            _dbContext.Images.RemoveRange(movie.Images);
            _dbContext.Movies.Remove(movie);
            _dbContext.SaveChanges();

            return true;
        }
    }
}
