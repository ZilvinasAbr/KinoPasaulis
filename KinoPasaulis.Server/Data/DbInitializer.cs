using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;
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

            await AddCinemaStudioUsers(cinemaStudios, userManager);

            context.SaveChanges();
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

        private static async Task CreateRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            //            var UserManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            string[] roleNames = { "Client", "Theather", "CinemaStudio", "Creators", "VoteAdmin" };
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
