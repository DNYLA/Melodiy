using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Melodiy.Features.Common.Context.Migrations
{
    /// <inheritdoc />
    public partial class RefreshTokensStore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Collection",
                table: "Albums",
                newName: "Type");

            migrationBuilder.AddColumn<bool>(
                name: "Step1Completedw",
                table: "Playlists",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Step1Completedw",
                table: "Playlists");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Albums",
                newName: "Collection");
        }
    }
}
