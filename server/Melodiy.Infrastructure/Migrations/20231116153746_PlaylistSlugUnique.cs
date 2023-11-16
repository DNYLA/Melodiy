using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Melodiy.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PlaylistSlugUnique : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Playlists_Slug",
                table: "Playlists",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Playlists_Slug",
                table: "Playlists");
        }
    }
}
