using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace KinoPasaulis.Server.Data
{
    public class DbInitializer
    {
        public static async void Initialize(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            IServiceProvider serviceProvider)
        {
            context.Database.Migrate();
            await CreateRoles(serviceProvider);

            if (context.Movies.Any())
            {
                return;
            }

            var cinemaStudios = AddCinemaStudios();
            context.AddRange(cinemaStudios);
            context.SaveChanges();

            var theathers = AddTheathers();
            context.AddRange(theathers);
            context.SaveChanges();

            var auditoriums = AddAuditoriums(theathers[0]);
            context.AddRange(auditoriums);
            context.SaveChanges();

            await AddCinemaStudioUsers(cinemaStudios, userManager);
            await AddTheatherUsers(theathers, userManager);

            var movies = AddMovies(cinemaStudios);
            context.AddRange(movies);
            context.SaveChanges();
        }

        private static List<Theather> AddTheathers()
        {
            var theathers = new List<Theather>
            {
                new Theather { Title = "Kino teatras 1", City = "Kaunas", Country = "Lietuva", Address = "Adreso g. 1", Email = "kinoTeatras@kinoTeatras.com", Phone = "+37066666666"}
            };

            return theathers;
        }

        private static List<Auditorium> AddAuditoriums(Theather theather)
        {
            var auditoriums = new List<Auditorium>
            {
                new Auditorium {Name = "Sale 1", Seats = 100, Theather = theather},
                new Auditorium {Name = "Sale 2", Seats = 75, Theather = theather},
                new Auditorium {Name = "Sale 3", Seats = 125, Theather = theather}
            };

            return auditoriums;
        }

        private static List<Movie> AddMovies(List<CinemaStudio> cinemaStudios)
        {
            var movies = new List<Movie>
            {
                new Movie { Title = "Filmas 1", ReleaseDate = new DateTime(1995, 11, 08), Budget = 1000000, Description = "An so vulgar to on points wanted. Not rapturous resolving continued household northward gay. He it otherwise supported instantly. Unfeeling agreeable suffering it on smallness newspaper be. So come must time no as. Do on unpleasing possession as of unreserved. Yet joy exquisite put sometimes enjoyment perpetual now. Behind lovers eat having length horses vanity say had its.", Gross = 2000000, Language = "anglų", AgeRequirement = "PG-13", CinemaStudio = cinemaStudios[0]},
                new Movie { Title = "Filmas 2", ReleaseDate = new DateTime(1995, 11, 08), Budget = 2000000, Description = "An so vulgar to on points wanted. Not rapturous resolving continued household northward gay. He it otherwise supported instantly. Unfeeling agreeable suffering it on smallness newspaper be. So come must time no as. Do on unpleasing possession as of unreserved. Yet joy exquisite put sometimes enjoyment perpetual now. Behind lovers eat having length horses vanity say had its.", Gross = 500000, Language = "lietuvių", AgeRequirement = "R", CinemaStudio = cinemaStudios[0]}
            };

            return movies;
        }

        private static List<CinemaStudio> AddCinemaStudios()
        {
            var cinemaStudios = new List<CinemaStudio>
            {
                new CinemaStudio { Name = "Kino Studija 1", Address = "Adreso g. 0", City = "Kaunas", Country = "Lietuva", Email = "kinoStudija@kinoStudija.com", Phone = "+37066666666"}
            };

            return cinemaStudios;
        }

        private static async Task< List<ApplicationUser> > AddCinemaStudioUsers(
            List<CinemaStudio> cinemaStudios, 
            UserManager<ApplicationUser> userManager)
        {
            var users = new List<ApplicationUser>
            {
                new ApplicationUser {UserName = "KinoStudija1", CinemaStudio = cinemaStudios[0]}
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "testas");
                await userManager.AddToRoleAsync(user, "CinemaStudio");
            }

            return users;
        }

        private static async Task< List<ApplicationUser> >  AddTheatherUsers(List<Theather> theathers, UserManager<ApplicationUser> userManager)
        {
            var users = new List<ApplicationUser>
            {
                new ApplicationUser {UserName = "KinoTeatras1", Theather= theathers[0]}
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "testas");
                await userManager.AddToRoleAsync(user, "Theather");
            }

            return users;
        }

        private static async Task CreateRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            //            var UserManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            string[] roleNames = { "Client", "Theather", "CinemaStudio", "MovieCreator", "VoteAdmin" };
            IdentityResult roleResult;
            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
        }
    }
}
