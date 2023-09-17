using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace melodiy.server.Migrations
{
    /// <inheritdoc />
    public partial class OptionalSpotifyId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Provider",
                table: "Songs",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "SpotifyId",
                table: "Songs",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Songs_SpotifyId",
                table: "Songs",
                column: "SpotifyId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Songs_SpotifyId",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "Provider",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "SpotifyId",
                table: "Songs");
        }
    }
}
