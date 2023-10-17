using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace melodiy.server.Migrations
{
    /// <inheritdoc />
    public partial class songsYoutubeId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "SongPath",
                table: "Songs",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "YoutubeId",
                table: "Songs",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "YoutubeId",
                table: "Songs");

            migrationBuilder.AlterColumn<string>(
                name: "SongPath",
                table: "Songs",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
