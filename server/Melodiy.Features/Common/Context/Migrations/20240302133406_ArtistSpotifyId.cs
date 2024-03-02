using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Melodiy.Features.Common.Context.Migrations
{
    /// <inheritdoc />
    public partial class ArtistSpotifyId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "YoutubeId",
                table: "Artists",
                newName: "SpotifyId");

            migrationBuilder.RenameIndex(
                name: "IX_Artists_YoutubeId",
                table: "Artists",
                newName: "IX_Artists_SpotifyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SpotifyId",
                table: "Artists",
                newName: "YoutubeId");

            migrationBuilder.RenameIndex(
                name: "IX_Artists_SpotifyId",
                table: "Artists",
                newName: "IX_Artists_YoutubeId");
        }
    }
}
