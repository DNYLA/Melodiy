using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Melodiy.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class TrackUserIdOptional : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tracks_Users_UserId",
                table: "Tracks");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Tracks",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Tracks_Users_UserId",
                table: "Tracks",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tracks_Users_UserId",
                table: "Tracks");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Tracks",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Tracks_Users_UserId",
                table: "Tracks",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
