using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace melodiy.server.Migrations
{
    /// <inheritdoc />
    public partial class Album_songs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Album2UID",
                table: "Songs",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Songs_Album2UID",
                table: "Songs",
                column: "Album2UID");

            migrationBuilder.AddForeignKey(
                name: "FK_Songs_Albums_Album2UID",
                table: "Songs",
                column: "Album2UID",
                principalTable: "Albums",
                principalColumn: "UID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Songs_Albums_Album2UID",
                table: "Songs");

            migrationBuilder.DropIndex(
                name: "IX_Songs_Album2UID",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "Album2UID",
                table: "Songs");
        }
    }
}
