using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Melodiy.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AlbumNameToTitle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Albums",
                newName: "Title");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Albums",
                newName: "Name");
        }
    }
}
