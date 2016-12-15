using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KinoPasaulis.Server.Migrations
{
    public partial class AddMovieCreatorsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_MovieCreator_MovieCreatorId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_MovieCreator_MovieCreatorId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieCreatorMovies_MovieCreator_MovieCreatorId",
                table: "MovieCreatorMovies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieCreator",
                table: "MovieCreator");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieCreators",
                table: "MovieCreator",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_MovieCreators_MovieCreatorId",
                table: "AspNetUsers",
                column: "MovieCreatorId",
                principalTable: "MovieCreator",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_MovieCreators_MovieCreatorId",
                table: "Images",
                column: "MovieCreatorId",
                principalTable: "MovieCreator",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieCreatorMovies_MovieCreators_MovieCreatorId",
                table: "MovieCreatorMovies",
                column: "MovieCreatorId",
                principalTable: "MovieCreator",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameTable(
                name: "MovieCreator",
                newName: "MovieCreators");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_MovieCreators_MovieCreatorId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_MovieCreators_MovieCreatorId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieCreatorMovies_MovieCreators_MovieCreatorId",
                table: "MovieCreatorMovies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieCreators",
                table: "MovieCreators");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieCreator",
                table: "MovieCreators",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_MovieCreator_MovieCreatorId",
                table: "AspNetUsers",
                column: "MovieCreatorId",
                principalTable: "MovieCreators",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_MovieCreator_MovieCreatorId",
                table: "Images",
                column: "MovieCreatorId",
                principalTable: "MovieCreators",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieCreatorMovies_MovieCreator_MovieCreatorId",
                table: "MovieCreatorMovies",
                column: "MovieCreatorId",
                principalTable: "MovieCreators",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameTable(
                name: "MovieCreators",
                newName: "MovieCreator");
        }
    }
}
