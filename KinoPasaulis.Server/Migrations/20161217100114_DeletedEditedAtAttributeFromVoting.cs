using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KinoPasaulis.Server.Migrations
{
    public partial class DeletedEditedAtAttributeFromVoting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_CinemaStudios_CinemaStudioId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_MovieCreators_MovieCreatorId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Votings_VotesAdmins_VotesAdminId",
                table: "Votings");

            migrationBuilder.DropColumn(
                name: "EditedAt",
                table: "Votings");

            migrationBuilder.AddColumn<bool>(
                name: "IsConfirmed",
                table: "MovieCreatorMovies",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<int>(
                name: "VotesAdminId",
                table: "Votings",
                nullable: false);

            migrationBuilder.AlterColumn<int>(
                name: "MovieCreatorId",
                table: "Messages",
                nullable: false);

            migrationBuilder.AlterColumn<int>(
                name: "CinemaStudioId",
                table: "Messages",
                nullable: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_CinemaStudios_CinemaStudioId",
                table: "Messages",
                column: "CinemaStudioId",
                principalTable: "CinemaStudios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_MovieCreators_MovieCreatorId",
                table: "Messages",
                column: "MovieCreatorId",
                principalTable: "MovieCreators",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Votings_VotesAdmins_VotesAdminId",
                table: "Votings",
                column: "VotesAdminId",
                principalTable: "VotesAdmins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_CinemaStudios_CinemaStudioId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_MovieCreators_MovieCreatorId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Votings_VotesAdmins_VotesAdminId",
                table: "Votings");

            migrationBuilder.DropColumn(
                name: "IsConfirmed",
                table: "MovieCreatorMovies");

            migrationBuilder.AddColumn<DateTime>(
                name: "EditedAt",
                table: "Votings",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<int>(
                name: "VotesAdminId",
                table: "Votings",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MovieCreatorId",
                table: "Messages",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CinemaStudioId",
                table: "Messages",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_CinemaStudios_CinemaStudioId",
                table: "Messages",
                column: "CinemaStudioId",
                principalTable: "CinemaStudios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_MovieCreators_MovieCreatorId",
                table: "Messages",
                column: "MovieCreatorId",
                principalTable: "MovieCreators",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Votings_VotesAdmins_VotesAdminId",
                table: "Votings",
                column: "VotesAdminId",
                principalTable: "VotesAdmins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
