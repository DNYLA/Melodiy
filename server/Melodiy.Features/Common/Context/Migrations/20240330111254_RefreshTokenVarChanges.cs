using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Melodiy.Features.Common.Context.Migrations
{
    /// <inheritdoc />
    public partial class RefreshTokenVarChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RefreshTokenExpiry",
                table: "RefreshTokens",
                newName: "Expired");

            migrationBuilder.RenameColumn(
                name: "RefreshToken",
                table: "RefreshTokens",
                newName: "Token");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Token",
                table: "RefreshTokens",
                newName: "RefreshToken");

            migrationBuilder.RenameColumn(
                name: "Expired",
                table: "RefreshTokens",
                newName: "RefreshTokenExpiry");
        }
    }
}
