using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Melodiy.Features.Common.Context.Migrations
{
    /// <inheritdoc />
    public partial class TrackExplicit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Explicit",
                table: "Tracks",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Explicit",
                table: "Tracks");
        }
    }
}
