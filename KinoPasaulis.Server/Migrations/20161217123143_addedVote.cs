using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace KinoPasaulis.Server.Migrations
{
    public partial class addedVote : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Votes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClientId = table.Column<int>(nullable: true),
                    MovieCreatorId = table.Column<int>(nullable: true),
                    VoteChangedOn = table.Column<DateTime>(nullable: false),
                    VotedOn = table.Column<DateTime>(nullable: false),
                    VotingId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Votes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Votes_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Votes_MovieCreators_MovieCreatorId",
                        column: x => x.MovieCreatorId,
                        principalTable: "MovieCreators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Votes_Votings_VotingId",
                        column: x => x.VotingId,
                        principalTable: "Votings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Votes_ClientId",
                table: "Votes",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_MovieCreatorId",
                table: "Votes",
                column: "MovieCreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_VotingId",
                table: "Votes",
                column: "VotingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Votes");
        }
    }
}
