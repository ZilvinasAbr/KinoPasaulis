using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KinoPasaulis.Server.Migrations
{
    public partial class AddConstraintsOnMovieTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Movies",
                maxLength: 50,
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "Language",
                table: "Movies",
                maxLength: 50,
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Movies",
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "AgeRequirement",
                table: "Movies",
                maxLength: 20,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Movies",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Language",
                table: "Movies",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Movies",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AgeRequirement",
                table: "Movies",
                nullable: true);
        }
    }
}
