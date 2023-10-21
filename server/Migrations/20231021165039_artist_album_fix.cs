using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace melodiy.server.Migrations
{
    /// <inheritdoc />
    public partial class artist_album_fix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AlbumArtist_Albums_ReleasesId",
                table: "AlbumArtist");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Albums",
                table: "Albums");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AlbumArtist",
                table: "AlbumArtist");

            migrationBuilder.DropIndex(
                name: "IX_AlbumArtist_ReleasesId",
                table: "AlbumArtist");

            migrationBuilder.DropColumn(
                name: "ReleasesId",
                table: "AlbumArtist");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Artists",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP",
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Albums",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP",
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddColumn<string>(
                name: "ReleasesUID",
                table: "AlbumArtist",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Albums",
                table: "Albums",
                column: "UID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AlbumArtist",
                table: "AlbumArtist",
                columns: new[] { "ArtistsUID", "ReleasesUID" });

            migrationBuilder.CreateIndex(
                name: "IX_Albums_Id",
                table: "Albums",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Albums_SpotifyId",
                table: "Albums",
                column: "SpotifyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AlbumArtist_ReleasesUID",
                table: "AlbumArtist",
                column: "ReleasesUID");

            migrationBuilder.AddForeignKey(
                name: "FK_AlbumArtist_Albums_ReleasesUID",
                table: "AlbumArtist",
                column: "ReleasesUID",
                principalTable: "Albums",
                principalColumn: "UID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AlbumArtist_Albums_ReleasesUID",
                table: "AlbumArtist");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Albums",
                table: "Albums");

            migrationBuilder.DropIndex(
                name: "IX_Albums_Id",
                table: "Albums");

            migrationBuilder.DropIndex(
                name: "IX_Albums_SpotifyId",
                table: "Albums");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AlbumArtist",
                table: "AlbumArtist");

            migrationBuilder.DropIndex(
                name: "IX_AlbumArtist_ReleasesUID",
                table: "AlbumArtist");

            migrationBuilder.DropColumn(
                name: "ReleasesUID",
                table: "AlbumArtist");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Artists",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldDefaultValueSql: "CURRENT_TIMESTAMP");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Albums",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldDefaultValueSql: "CURRENT_TIMESTAMP");

            migrationBuilder.AddColumn<int>(
                name: "ReleasesId",
                table: "AlbumArtist",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Albums",
                table: "Albums",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AlbumArtist",
                table: "AlbumArtist",
                columns: new[] { "ArtistsUID", "ReleasesId" });

            migrationBuilder.CreateIndex(
                name: "IX_AlbumArtist_ReleasesId",
                table: "AlbumArtist",
                column: "ReleasesId");

            migrationBuilder.AddForeignKey(
                name: "FK_AlbumArtist_Albums_ReleasesId",
                table: "AlbumArtist",
                column: "ReleasesId",
                principalTable: "Albums",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
