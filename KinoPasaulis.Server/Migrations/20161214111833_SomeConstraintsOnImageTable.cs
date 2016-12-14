using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KinoPasaulis.Server.Migrations
{
    public partial class SomeConstraintsOnImageTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_MovieCreator_MovieCreatorId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Movies_MovieId",
                table: "Images");

            migrationBuilder.AlterColumn<int>(
                name: "MovieId",
                table: "Images",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MovieCreatorId",
                table: "Images",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_MovieCreator_MovieCreatorId",
                table: "Images",
                column: "MovieCreatorId",
                principalTable: "MovieCreator",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Movies_MovieId",
                table: "Images",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_MovieCreator_MovieCreatorId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Movies_MovieId",
                table: "Images");

            migrationBuilder.AlterColumn<int>(
                name: "MovieId",
                table: "Images",
                nullable: false);

            migrationBuilder.AlterColumn<int>(
                name: "MovieCreatorId",
                table: "Images",
                nullable: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_MovieCreator_MovieCreatorId",
                table: "Images",
                column: "MovieCreatorId",
                principalTable: "MovieCreator",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Movies_MovieId",
                table: "Images",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
