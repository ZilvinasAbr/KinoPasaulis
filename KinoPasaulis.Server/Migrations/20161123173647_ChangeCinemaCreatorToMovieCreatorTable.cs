using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace KinoPasaulis.Server.Migrations
{
    public partial class ChangeCinemaCreatorToMovieCreatorTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_CinemaCreator_CinemaCreatorId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_CinemaCreatorId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CinemaCreatorId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "CinemaCreator");

            migrationBuilder.CreateTable(
                name: "MovieCreator",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastEditDate = table.Column<DateTime>(nullable: false),
                    LastName = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    RegisterDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieCreator", x => x.Id);
                });

            migrationBuilder.AddColumn<int>(
                name: "MovieCreatorId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_MovieCreatorId",
                table: "AspNetUsers",
                column: "MovieCreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_MovieCreator_MovieCreatorId",
                table: "AspNetUsers",
                column: "MovieCreatorId",
                principalTable: "MovieCreator",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_MovieCreator_MovieCreatorId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_MovieCreatorId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "MovieCreatorId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "MovieCreator");

            migrationBuilder.CreateTable(
                name: "CinemaCreator",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastEditDate = table.Column<DateTime>(nullable: false),
                    LastName = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    RegisterDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CinemaCreator", x => x.Id);
                });

            migrationBuilder.AddColumn<int>(
                name: "CinemaCreatorId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_CinemaCreatorId",
                table: "AspNetUsers",
                column: "CinemaCreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_CinemaCreator_CinemaCreatorId",
                table: "AspNetUsers",
                column: "CinemaCreatorId",
                principalTable: "CinemaCreator",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
