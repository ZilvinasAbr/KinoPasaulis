using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public virtual DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public virtual DbSet<Auditorium> Auditoriums { get; set; }
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<Movie> Movies { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Subscription> Subscriptions { get; set; }
        public virtual DbSet<Show> Shows { get; set; }
        public virtual DbSet<MovieCreator> MovieCreators { get; set; }
        public virtual DbSet<Theather> Theathers { get; set; }
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<CinemaStudio> CinemaStudios { get; set; }
        public virtual DbSet<Image> Images { get; set; }
        public virtual DbSet<Video> Videos { get; set; }
        public virtual DbSet<MovieCreatorMovie> MovieCreatorMovies { get; set; }
        public virtual DbSet<Rating> Ratings { get; set; }
        public virtual DbSet<Message> Messages { get; set; }
        public virtual DbSet<Announcement> Announcements { get; set; }
        public virtual DbSet<Specialty> Specialties { get; set; }
        public virtual DbSet<MovieCreatorVoting> MovieCreatorVotings { get; set; }
        public virtual DbSet<VotesAdmin> VotesAdmins { get; set; }
        public virtual DbSet<Voting> Votings { get; set; }
        public virtual DbSet<JobAdvertisement> JobAdvertisements { get; set; }
        public virtual DbSet<Vote> Votes { get; set; }

        public ApplicationDbContext()
        {
            
        }
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<MovieCreatorMovie>()
                .HasKey(mm => new {mm.MovieCreatorId, mm.MovieId});

            builder.Entity<Movie>()
                .HasMany(movie => movie.MovieCreatorMovies)
                .WithOne(mm => mm.Movie)
                .HasForeignKey(mm => mm.MovieId);

            builder.Entity<MovieCreator>()
                .HasMany(creator => creator.MovieCreatorMovies)
                .WithOne(mm => mm.MovieCreator)
                .HasForeignKey(mm => mm.MovieCreatorId);

            /*builder.Entity<MovieCreatorSpecialty>()
                .HasKey(ms => new { ms.MovieCreatorId, ms.SpecialtyId });*/

            /*builder.Entity<Specialty>()
                .HasMany(specialty => specialty.MovieCreatorSpecialties)
                .WithOne(ms => ms.Specialty)
                .HasForeignKey(ms => ms.SpecialtyId);*/

            /*builder.Entity<MovieCreator>()
                .HasMany(creator => creator.MovieCreatorSpecialties)
                .WithOne(ms => ms.MovieCreator)
                .HasForeignKey(ms => ms.MovieCreatorId);*/

            builder.Entity<MovieCreatorVoting>()
                .HasKey(mv => new { mv.MovieCreatorId, mv.VotingId });

            builder.Entity<Voting>()
                .HasMany(voting => voting.MovieCreatorVotings)
                .WithOne(mv => mv.Voting)
                .HasForeignKey(mv => mv.VotingId);

            builder.Entity<MovieCreator>()
                .HasMany(creator => creator.MovieCreatorVotings)
                .WithOne(mv => mv.MovieCreator)
                .HasForeignKey(mv => mv.MovieCreatorId);
        }
    }
}
