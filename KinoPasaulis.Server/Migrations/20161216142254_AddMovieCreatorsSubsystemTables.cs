using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace KinoPasaulis.Server.Migrations
{
    public partial class AddMovieCreatorsSubsystemTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CinemaStudioId = table.Column<int>(nullable: true),
                    MovieCreatorId = table.Column<int>(nullable: true),
                    ReadAt = table.Column<DateTime>(nullable: false),
                    SentAt = table.Column<DateTime>(nullable: false),
                    Text = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_CinemaStudios_CinemaStudioId",
                        column: x => x.CinemaStudioId,
                        principalTable: "CinemaStudios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Messages_MovieCreators_MovieCreatorId",
                        column: x => x.MovieCreatorId,
                        principalTable: "MovieCreators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Specialties",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    EditDate = table.Column<DateTime>(nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Specialties", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VotesAdmins",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    RegisterDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VotesAdmins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MovieCreatorSpecialties",
                columns: table => new
                {
                    MovieCreatorId = table.Column<int>(nullable: false),
                    SpecialtyId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieCreatorSpecialties", x => new { x.MovieCreatorId, x.SpecialtyId });
                    table.ForeignKey(
                        name: "FK_MovieCreatorSpecialties_MovieCreators_MovieCreatorId",
                        column: x => x.MovieCreatorId,
                        principalTable: "MovieCreators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MovieCreatorSpecialties_Specialties_SpecialtyId",
                        column: x => x.SpecialtyId,
                        principalTable: "Specialties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Votings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    EditedAt = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    VotesAdminId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Votings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Votings_VotesAdmins_VotesAdminId",
                        column: x => x.VotesAdminId,
                        principalTable: "VotesAdmins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MovieCreatorVotings",
                columns: table => new
                {
                    MovieCreatorId = table.Column<int>(nullable: false),
                    VotingId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieCreatorVotings", x => new { x.MovieCreatorId, x.VotingId });
                    table.ForeignKey(
                        name: "FK_MovieCreatorVotings_MovieCreators_MovieCreatorId",
                        column: x => x.MovieCreatorId,
                        principalTable: "MovieCreators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MovieCreatorVotings_Votings_VotingId",
                        column: x => x.VotingId,
                        principalTable: "Votings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_CinemaStudioId",
                table: "Messages",
                column: "CinemaStudioId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_MovieCreatorId",
                table: "Messages",
                column: "MovieCreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_MovieCreatorSpecialties_MovieCreatorId",
                table: "MovieCreatorSpecialties",
                column: "MovieCreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_MovieCreatorSpecialties_SpecialtyId",
                table: "MovieCreatorSpecialties",
                column: "SpecialtyId");

            migrationBuilder.CreateIndex(
                name: "IX_MovieCreatorVotings_MovieCreatorId",
                table: "MovieCreatorVotings",
                column: "MovieCreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_MovieCreatorVotings_VotingId",
                table: "MovieCreatorVotings",
                column: "VotingId");

            migrationBuilder.CreateIndex(
                name: "IX_Votings_VotesAdminId",
                table: "Votings",
                column: "VotesAdminId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "MovieCreatorSpecialties");

            migrationBuilder.DropTable(
                name: "MovieCreatorVotings");

            migrationBuilder.DropTable(
                name: "Specialties");

            migrationBuilder.DropTable(
                name: "Votings");

            migrationBuilder.DropTable(
                name: "VotesAdmins");
        }
    }
}
