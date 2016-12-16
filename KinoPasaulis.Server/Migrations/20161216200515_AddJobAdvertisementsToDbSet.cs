using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KinoPasaulis.Server.Migrations
{
    public partial class AddJobAdvertisementsToDbSet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobAdvertisement_Movies_MovieId",
                table: "JobAdvertisement");

            migrationBuilder.DropForeignKey(
                name: "FK_JobAdvertisement_Specialties_SpecialtyId",
                table: "JobAdvertisement");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobAdvertisement",
                table: "JobAdvertisement");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobAdvertisements",
                table: "JobAdvertisement",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_JobAdvertisements_Movies_MovieId",
                table: "JobAdvertisement",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobAdvertisements_Specialties_SpecialtyId",
                table: "JobAdvertisement",
                column: "SpecialtyId",
                principalTable: "Specialties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameIndex(
                name: "IX_JobAdvertisement_SpecialtyId",
                table: "JobAdvertisement",
                newName: "IX_JobAdvertisements_SpecialtyId");

            migrationBuilder.RenameIndex(
                name: "IX_JobAdvertisement_MovieId",
                table: "JobAdvertisement",
                newName: "IX_JobAdvertisements_MovieId");

            migrationBuilder.RenameTable(
                name: "JobAdvertisement",
                newName: "JobAdvertisements");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobAdvertisements_Movies_MovieId",
                table: "JobAdvertisements");

            migrationBuilder.DropForeignKey(
                name: "FK_JobAdvertisements_Specialties_SpecialtyId",
                table: "JobAdvertisements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobAdvertisements",
                table: "JobAdvertisements");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobAdvertisement",
                table: "JobAdvertisements",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_JobAdvertisement_Movies_MovieId",
                table: "JobAdvertisements",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobAdvertisement_Specialties_SpecialtyId",
                table: "JobAdvertisements",
                column: "SpecialtyId",
                principalTable: "Specialties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameIndex(
                name: "IX_JobAdvertisements_SpecialtyId",
                table: "JobAdvertisements",
                newName: "IX_JobAdvertisement_SpecialtyId");

            migrationBuilder.RenameIndex(
                name: "IX_JobAdvertisements_MovieId",
                table: "JobAdvertisements",
                newName: "IX_JobAdvertisement_MovieId");

            migrationBuilder.RenameTable(
                name: "JobAdvertisements",
                newName: "JobAdvertisement");
        }
    }
}
