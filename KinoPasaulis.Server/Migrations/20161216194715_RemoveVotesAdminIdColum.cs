using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KinoPasaulis.Server.Migrations
{
    public partial class RemoveVotesAdminIdColum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VotesAdminId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_VotesAdminId",
                table: "AspNetUsers",
                column: "VotesAdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_VotesAdmins_VotesAdminId",
                table: "AspNetUsers",
                column: "VotesAdminId",
                principalTable: "VotesAdmins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_VotesAdmins_VotesAdminId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_VotesAdminId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "VotesAdminId",
                table: "AspNetUsers");
        }
    }
}
