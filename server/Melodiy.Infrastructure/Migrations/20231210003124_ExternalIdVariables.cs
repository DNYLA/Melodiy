using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Melodiy.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ExternalIdVariables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "YoutubeId",
                table: "Tracks",
                newName: "ExternalStreamId");

            migrationBuilder.RenameColumn(
                name: "SpotifyId",
                table: "Tracks",
                newName: "ExternalSearchId");

            migrationBuilder.RenameIndex(
                name: "IX_Tracks_SpotifyId",
                table: "Tracks",
                newName: "IX_Tracks_ExternalSearchId");

            migrationBuilder.RenameColumn(
                name: "SpotifyId",
                table: "Artists",
                newName: "ExternalSearchId");

            migrationBuilder.RenameIndex(
                name: "IX_Artists_SpotifyId",
                table: "Artists",
                newName: "IX_Artists_ExternalSearchId");

            migrationBuilder.RenameColumn(
                name: "SpotifyId",
                table: "Albums",
                newName: "ExternalSearchId");

            migrationBuilder.RenameIndex(
                name: "IX_Albums_SpotifyId",
                table: "Albums",
                newName: "IX_Albums_ExternalSearchId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ExternalStreamId",
                table: "Tracks",
                newName: "YoutubeId");

            migrationBuilder.RenameColumn(
                name: "ExternalSearchId",
                table: "Tracks",
                newName: "SpotifyId");

            migrationBuilder.RenameIndex(
                name: "IX_Tracks_ExternalSearchId",
                table: "Tracks",
                newName: "IX_Tracks_SpotifyId");

            migrationBuilder.RenameColumn(
                name: "ExternalSearchId",
                table: "Artists",
                newName: "SpotifyId");

            migrationBuilder.RenameIndex(
                name: "IX_Artists_ExternalSearchId",
                table: "Artists",
                newName: "IX_Artists_SpotifyId");

            migrationBuilder.RenameColumn(
                name: "ExternalSearchId",
                table: "Albums",
                newName: "SpotifyId");

            migrationBuilder.RenameIndex(
                name: "IX_Albums_ExternalSearchId",
                table: "Albums",
                newName: "IX_Albums_SpotifyId");
        }
    }
}
