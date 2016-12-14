using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KinoPasaulis.Server.Migrations
{
    public partial class AddCinemaStudiosTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_CinemaStudio_CinemaStudioId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Movies_CinemaStudio_CinemaStudioId",
                table: "Movies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CinemaStudio",
                table: "CinemaStudio");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CinemaStudios",
                table: "CinemaStudio",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_CinemaStudios_CinemaStudioId",
                table: "AspNetUsers",
                column: "CinemaStudioId",
                principalTable: "CinemaStudio",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_CinemaStudios_CinemaStudioId",
                table: "Movies",
                column: "CinemaStudioId",
                principalTable: "CinemaStudio",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameTable(
                name: "CinemaStudio",
                newName: "CinemaStudios");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_CinemaStudios_CinemaStudioId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Movies_CinemaStudios_CinemaStudioId",
                table: "Movies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CinemaStudios",
                table: "CinemaStudios");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CinemaStudio",
                table: "CinemaStudios",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_CinemaStudio_CinemaStudioId",
                table: "AspNetUsers",
                column: "CinemaStudioId",
                principalTable: "CinemaStudios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_CinemaStudio_CinemaStudioId",
                table: "Movies",
                column: "CinemaStudioId",
                principalTable: "CinemaStudios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameTable(
                name: "CinemaStudios",
                newName: "CinemaStudio");
        }
    }
}
