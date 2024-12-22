using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Melodiy.Features.Common.Context.Migrations
{
    /// <inheritdoc />
    public partial class imagepathuniqueindex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Images_Path",
                table: "Images",
                column: "Path",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Images_Path",
                table: "Images");
        }
    }
}
