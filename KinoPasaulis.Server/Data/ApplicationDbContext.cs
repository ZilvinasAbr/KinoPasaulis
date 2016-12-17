using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Auditorium> Auditoriums { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<Show> Shows { get; set; }
        public DbSet<MovieCreator> MovieCreators { get; set; }
        public DbSet<Theather> Theathers { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<CinemaStudio> CinemaStudios { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<MovieCreatorMovie> MovieCreatorMovies { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Specialty> Specialties { get; set; }
        public DbSet<MovieCreatorSpecialty> MovieCreatorSpecialties { get; set; }
        public DbSet<MovieCreatorVoting> MovieCreatorVotings { get; set; }
        public DbSet<VotesAdmin> VotesAdmins { get; set; }
        public DbSet<Voting> Votings { get; set; }
        public DbSet<Vote> Votes { get; set; }
        
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

            builder.Entity<MovieCreatorSpecialty>()
                .HasKey(ms => new { ms.MovieCreatorId, ms.SpecialtyId });

            builder.Entity<Specialty>()
                .HasMany(specialty => specialty.MovieCreatorSpecialties)
                .WithOne(ms => ms.Specialty)
                .HasForeignKey(ms => ms.SpecialtyId);

            builder.Entity<MovieCreator>()
                .HasMany(creator => creator.MovieCreatorSpecialties)
                .WithOne(ms => ms.MovieCreator)
                .HasForeignKey(ms => ms.MovieCreatorId);

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
