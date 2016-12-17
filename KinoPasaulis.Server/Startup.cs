using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Mapper;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Repositories.CinemaStudio;
using KinoPasaulis.Server.Repositories.Client;
using KinoPasaulis.Server.Repositories.MovieCreator;
using KinoPasaulis.Server.Repositories.Theather;
using KinoPasaulis.Server.Services;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace KinoPasaulis.Server
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see https://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>(o =>
                {
                    o.Password.RequireDigit = false;
                    o.Password.RequireLowercase = false;
                    o.Password.RequireUppercase = false;
                    o.Password.RequireNonAlphanumeric = false;
                    o.Password.RequiredLength = 6;
                })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc()
                .AddJsonOptions(o => o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

            // Mappers
            services.AddTransient<ITheatherMapper, TheatherMapper>();

            // Add application services.
            services.AddTransient<IApplicationService, ApplicationService>();
            services.AddTransient<ITheatherService, TheatherService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ICinemaStudioService, CinemaStudioService>();
            services.AddTransient<IClientService, ClientService>();
            services.AddTransient<IMovieCreatorService, MovieCreatorService>();

            // Repositories
            services.AddTransient<IEventRepository, EventRepository>();
            services.AddTransient<IAuditoriumRepository, AuditoriumRepository>();
            services.AddTransient<IShowRepository, ShowRepository>();
            services.AddTransient<IMovieRepository, MovieRepository>();
            services.AddTransient<IOrderRepository, OrderRepository>();
            services.AddTransient<IAnnouncementRepository, AnnouncementRepository>();
            services.AddTransient<ISubscriptionRepository, SubscriptionRepository>();
            services.AddTransient<ITheatherRepository, TheatherRepository>();
            services.AddTransient<IVoteRepository, VoteRepository>();
            services.AddTransient<IVotingRepository, VotingRepository>();
            services.AddTransient<IMovieCreatorRepository, MovieCreatorRepository>();
            services.AddTransient<IRatingRepository, RatingRepository>();

            //services.AddTransient<IEmailSender, AuthMessageSender>();
            //services.AddTransient<ISmsSender, AuthMessageSender>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory,
            IServiceProvider serviceProvider, ApplicationDbContext context,
            UserManager<ApplicationUser> userManager )
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseIdentity();

            // Add external authentication middleware below. To configure them please see https://go.microsoft.com/fwlink/?LinkID=532715

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
                routes.MapRoute("Error", "{*url}", new {controller = "Home", action = "Index"});
            });

            DbInitializer.Initialize(context, userManager, serviceProvider);
        }
    }
}
