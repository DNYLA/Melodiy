using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Melodiy.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemovedTrackPosAddedAlbumIndexed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Position",
                table: "Tracks");

            migrationBuilder.AddColumn<bool>(
                name: "Indexed",
                table: "Albums",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Indexed",
                table: "Albums");

            migrationBuilder.AddColumn<int>(
                name: "Position",
                table: "Tracks",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
