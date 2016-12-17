using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KinoPasaulis.Server.Migrations
{
    public partial class fixedClientRating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastLoggedOn",
                table: "Ratings");

            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                table: "Clients",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "Clients");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastLoggedOn",
                table: "Ratings",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
