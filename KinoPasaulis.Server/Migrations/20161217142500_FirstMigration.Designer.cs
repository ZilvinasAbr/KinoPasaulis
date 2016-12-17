using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using KinoPasaulis.Server.Data;

namespace KinoPasaulis.Server.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20161217142500_FirstMigration")]
    partial class FirstMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("KinoPasaulis.Server.Models.Announcement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ClientId");

                    b.Property<DateTime>("Created");

                    b.Property<string>("Message");

                    b.Property<DateTime>("Seen");

                    b.Property<DateTime>("Sent");

                    b.Property<int?>("TheaterId");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.HasIndex("TheaterId");

                    b.ToTable("Announcements");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id");

                    b.Property<int>("AccessFailedCount");

                    b.Property<int?>("CinemaStudioId");

                    b.Property<int?>("ClientId");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<int?>("MovieCreatorId");

                    b.Property<string>("NormalizedEmail")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedUserName")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<int?>("VotesAdminId");

                    b.HasKey("Id");

                    b.HasIndex("CinemaStudioId");

                    b.HasIndex("ClientId");

                    b.HasIndex("MovieCreatorId");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.HasIndex("VotesAdminId");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Auditorium", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int>("Seats");

                    b.Property<int?>("TheatherId");

                    b.HasKey("Id");

                    b.HasIndex("TheatherId");

                    b.ToTable("Auditoriums");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.CinemaStudio", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.Property<string>("Phone");

                    b.HasKey("Id");

                    b.ToTable("CinemaStudios");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Active");

                    b.Property<DateTime>("BirthDate");

                    b.Property<bool>("Blocked");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<DateTime>("LastEditDate");

                    b.Property<DateTime>("LastLoginDate");

                    b.Property<string>("LastName");

                    b.Property<string>("Phone");

                    b.Property<DateTime>("RegisterDate");

                    b.HasKey("Id");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("EndTime");

                    b.Property<int?>("MovieId");

                    b.Property<DateTime>("StartTime");

                    b.Property<int?>("TheatherId");

                    b.HasKey("Id");

                    b.HasIndex("MovieId");

                    b.HasIndex("TheatherId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("Description")
                        .HasAnnotation("MaxLength", 50);

                    b.Property<int?>("MovieCreatorId");

                    b.Property<int?>("MovieId");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 40);

                    b.Property<string>("Url")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("MovieCreatorId");

                    b.HasIndex("MovieId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.JobAdvertisement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description")
                        .HasAnnotation("MaxLength", 255);

                    b.Property<int>("Duration");

                    b.Property<int>("MovieId");

                    b.Property<decimal>("PayRate");

                    b.Property<int>("SpecialtyId");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 50);

                    b.HasKey("Id");

                    b.HasIndex("MovieId");

                    b.HasIndex("SpecialtyId");

                    b.ToTable("JobAdvertisements");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CinemaStudioId");

                    b.Property<int>("MovieCreatorId");

                    b.Property<DateTime>("ReadAt");

                    b.Property<DateTime>("SentAt");

                    b.Property<string>("Text");

                    b.HasKey("Id");

                    b.HasIndex("CinemaStudioId");

                    b.HasIndex("MovieCreatorId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Movie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AgeRequirement")
                        .HasAnnotation("MaxLength", 20);

                    b.Property<decimal>("Budget");

                    b.Property<int>("CinemaStudioId");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<decimal>("Gross");

                    b.Property<string>("Language")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 50);

                    b.Property<DateTime>("ReleaseDate");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 50);

                    b.HasKey("Id");

                    b.HasIndex("CinemaStudioId");

                    b.ToTable("Movies");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.MovieCreator", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("BirthDate");

                    b.Property<string>("Description");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<DateTime>("LastEditDate");

                    b.Property<string>("LastName");

                    b.Property<string>("Phone");

                    b.Property<DateTime>("RegisterDate");

                    b.HasKey("Id");

                    b.ToTable("MovieCreators");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.MovieCreatorMovie", b =>
                {
                    b.Property<int>("MovieCreatorId");

                    b.Property<int>("MovieId");

                    b.Property<bool>("IsConfirmed");

                    b.HasKey("MovieCreatorId", "MovieId");

                    b.HasIndex("MovieCreatorId");

                    b.HasIndex("MovieId");

                    b.ToTable("MovieCreatorMovies");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.MovieCreatorSpecialty", b =>
                {
                    b.Property<int>("MovieCreatorId");

                    b.Property<int>("SpecialtyId");

                    b.HasKey("MovieCreatorId", "SpecialtyId");

                    b.HasIndex("MovieCreatorId");

                    b.HasIndex("SpecialtyId");

                    b.ToTable("MovieCreatorSpecialties");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.MovieCreatorVoting", b =>
                {
                    b.Property<int>("MovieCreatorId");

                    b.Property<int>("VotingId");

                    b.HasKey("MovieCreatorId", "VotingId");

                    b.HasIndex("MovieCreatorId");

                    b.HasIndex("VotingId");

                    b.ToTable("MovieCreatorVotings");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Amount");

                    b.Property<int?>("ClientId");

                    b.Property<DateTime>("OrderDate");

                    b.Property<bool>("Paid");

                    b.Property<double>("Price");

                    b.Property<int?>("ShowId");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.HasIndex("ShowId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Rating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ClientId");

                    b.Property<string>("Comment");

                    b.Property<int>("MovieId");

                    b.Property<DateTime>("RatingCreatedOn");

                    b.Property<DateTime>("RatingModifiedOn");

                    b.Property<byte>("RatingType");

                    b.Property<int>("Value");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.HasIndex("MovieId");

                    b.ToTable("Ratings");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Show", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AuditoriumId");

                    b.Property<int?>("EventId");

                    b.Property<DateTime>("StartTime");

                    b.HasKey("Id");

                    b.HasIndex("AuditoriumId");

                    b.HasIndex("EventId");

                    b.ToTable("Shows");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Specialty", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("EditDate");

                    b.Property<int>("Quantity");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Specialties");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Subscription", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("BeginDate");

                    b.Property<int?>("ClientId");

                    b.Property<DateTime?>("EndDate");

                    b.Property<double>("Period");

                    b.Property<int?>("TheatherId");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.HasIndex("TheatherId");

                    b.ToTable("Subscriptions");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Theather", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<string>("Email");

                    b.Property<string>("Phone");

                    b.Property<string>("Title");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Theathers");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Video", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 50);

                    b.Property<int>("MovieId");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 40);

                    b.Property<string>("Url")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("MovieId");

                    b.ToTable("Videos");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Vote", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ClientId");

                    b.Property<int?>("MovieCreatorId");

                    b.Property<DateTime>("VoteChangedOn");

                    b.Property<DateTime>("VotedOn");

                    b.Property<int?>("VotingId");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.HasIndex("MovieCreatorId");

                    b.HasIndex("VotingId");

                    b.ToTable("Votes");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.VotesAdmin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Phone");

                    b.Property<DateTime>("RegisterDate");

                    b.HasKey("Id");

                    b.ToTable("VotesAdmins");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Voting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("EndDate");

                    b.Property<DateTime>("StartDate");

                    b.Property<string>("Title");

                    b.Property<int>("VotesAdminId");

                    b.HasKey("Id");

                    b.HasIndex("VotesAdminId");

                    b.ToTable("Votings");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Announcement", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.Client", "Client")
                        .WithMany()
                        .HasForeignKey("ClientId");

                    b.HasOne("KinoPasaulis.Server.Models.Theather", "Theater")
                        .WithMany()
                        .HasForeignKey("TheaterId");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.ApplicationUser", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.CinemaStudio", "CinemaStudio")
                        .WithMany()
                        .HasForeignKey("CinemaStudioId");

                    b.HasOne("KinoPasaulis.Server.Models.Client", "Client")
                        .WithMany()
                        .HasForeignKey("ClientId");

                    b.HasOne("KinoPasaulis.Server.Models.MovieCreator", "MovieCreator")
                        .WithMany()
                        .HasForeignKey("MovieCreatorId");

                    b.HasOne("KinoPasaulis.Server.Models.VotesAdmin", "VotesAdmin")
                        .WithMany()
                        .HasForeignKey("VotesAdminId");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Auditorium", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.Theather", "Theather")
                        .WithMany("Auditoriums")
                        .HasForeignKey("TheatherId");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Event", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.Movie", "Movie")
                        .WithMany("Events")
                        .HasForeignKey("MovieId");

                    b.HasOne("KinoPasaulis.Server.Models.Theather", "Theather")
                        .WithMany("Events")
                        .HasForeignKey("TheatherId");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Image", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.MovieCreator", "MovieCreator")
                        .WithMany("Images")
                        .HasForeignKey("MovieCreatorId");

                    b.HasOne("KinoPasaulis.Server.Models.Movie", "Movie")
                        .WithMany("Images")
                        .HasForeignKey("MovieId");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.JobAdvertisement", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.Movie", "Movie")
                        .WithMany("JobAdvertisements")
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("KinoPasaulis.Server.Models.Specialty", "Specialty")
                        .WithMany("JobAdvertisements")
                        .HasForeignKey("SpecialtyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Message", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.CinemaStudio", "CinemaStudio")
                        .WithMany()
                        .HasForeignKey("CinemaStudioId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("KinoPasaulis.Server.Models.MovieCreator", "MovieCreator")
                        .WithMany("Messages")
                        .HasForeignKey("MovieCreatorId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Movie", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.CinemaStudio", "CinemaStudio")
                        .WithMany("Movies")
                        .HasForeignKey("CinemaStudioId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.MovieCreatorMovie", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.MovieCreator", "MovieCreator")
                        .WithMany("MovieCreatorMovies")
                        .HasForeignKey("MovieCreatorId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("KinoPasaulis.Server.Models.Movie", "Movie")
                        .WithMany("MovieCreatorMovies")
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.MovieCreatorSpecialty", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.MovieCreator", "MovieCreator")
                        .WithMany("MovieCreatorSpecialties")
                        .HasForeignKey("MovieCreatorId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("KinoPasaulis.Server.Models.Specialty", "Specialty")
                        .WithMany("MovieCreatorSpecialties")
                        .HasForeignKey("SpecialtyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.MovieCreatorVoting", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.MovieCreator", "MovieCreator")
                        .WithMany("MovieCreatorVotings")
                        .HasForeignKey("MovieCreatorId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("KinoPasaulis.Server.Models.Voting", "Voting")
                        .WithMany("MovieCreatorVotings")
                        .HasForeignKey("VotingId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Order", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.Client", "Client")
                        .WithMany()
                        .HasForeignKey("ClientId");

                    b.HasOne("KinoPasaulis.Server.Models.Show", "Show")
                        .WithMany("Orders")
                        .HasForeignKey("ShowId");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Rating", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.Client", "Client")
                        .WithMany("Ratings")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("KinoPasaulis.Server.Models.Movie", "Movie")
                        .WithMany("Ratings")
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Show", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.Auditorium", "Auditorium")
                        .WithMany()
                        .HasForeignKey("AuditoriumId");

                    b.HasOne("KinoPasaulis.Server.Models.Event", "Event")
                        .WithMany("Shows")
                        .HasForeignKey("EventId");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Subscription", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.Client", "Client")
                        .WithMany()
                        .HasForeignKey("ClientId");

                    b.HasOne("KinoPasaulis.Server.Models.Theather", "Theather")
                        .WithMany()
                        .HasForeignKey("TheatherId");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Theather", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.ApplicationUser", "User")
                        .WithOne("Theather")
                        .HasForeignKey("KinoPasaulis.Server.Models.Theather", "UserId");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Video", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.Movie", "Movie")
                        .WithMany("Videos")
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Vote", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.Client", "Client")
                        .WithMany()
                        .HasForeignKey("ClientId");

                    b.HasOne("KinoPasaulis.Server.Models.MovieCreator", "MovieCreator")
                        .WithMany()
                        .HasForeignKey("MovieCreatorId");

                    b.HasOne("KinoPasaulis.Server.Models.Voting", "Voting")
                        .WithMany()
                        .HasForeignKey("VotingId");
                });

            modelBuilder.Entity("KinoPasaulis.Server.Models.Voting", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.VotesAdmin", "VotesAdmin")
                        .WithMany("Votings")
                        .HasForeignKey("VotesAdminId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Claims")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.ApplicationUser")
                        .WithMany("Claims")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("KinoPasaulis.Server.Models.ApplicationUser")
                        .WithMany("Logins")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("KinoPasaulis.Server.Models.ApplicationUser")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
