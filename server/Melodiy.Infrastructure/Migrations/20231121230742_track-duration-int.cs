using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Melodiy.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class trackdurationint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Duration",
                table: "Tracks",
                type: "integer",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "interval");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<TimeSpan>(
                name: "Duration",
                table: "Tracks",
                type: "interval",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");
        }
    }
}
