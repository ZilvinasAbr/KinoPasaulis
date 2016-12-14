using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KinoPasaulis.Server.Migrations
{
    public partial class AddMovieCreatorMoviesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MovieCreatorMovies",
                columns: table => new
                {
                    MovieCreatorId = table.Column<int>(nullable: false),
                    MovieId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieCreatorMovies", x => new { x.MovieCreatorId, x.MovieId });
                    table.ForeignKey(
                        name: "FK_MovieCreatorMovies_MovieCreator_MovieCreatorId",
                        column: x => x.MovieCreatorId,
                        principalTable: "MovieCreator",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MovieCreatorMovies_Movies_MovieId",
                        column: x => x.MovieId,
                        principalTable: "Movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MovieCreatorMovies_MovieCreatorId",
                table: "MovieCreatorMovies",
                column: "MovieCreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_MovieCreatorMovies_MovieId",
                table: "MovieCreatorMovies",
                column: "MovieId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MovieCreatorMovies");
        }
    }
}
