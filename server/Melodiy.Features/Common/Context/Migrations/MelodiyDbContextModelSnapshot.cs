﻿// <auto-generated />
using System;
using Melodiy.Features.Common.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Melodiy.Features.Common.Context.Migrations
{
    [DbContext(typeof(MelodiyDbContext))]
    partial class MelodiyDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("AlbumArtist", b =>
                {
                    b.Property<int>("AlbumsId")
                        .HasColumnType("integer");

                    b.Property<int>("ArtistsId")
                        .HasColumnType("integer");

                    b.HasKey("AlbumsId", "ArtistsId");

                    b.HasIndex("ArtistsId");

                    b.ToTable("AlbumArtist");
                });

            modelBuilder.Entity("Melodiy.Features.Album.Entities.Album", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("ImageId")
                        .HasColumnType("integer");

                    b.Property<bool>("Indexed")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("ReleaseDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SpotifyId")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.Property<bool>("Verified")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.HasIndex("ImageId");

                    b.HasIndex("Slug")
                        .IsUnique();

                    b.HasIndex("SpotifyId")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("Albums");
                });

            modelBuilder.Entity("Melodiy.Features.Album.Entities.AlbumTrack", b =>
                {
                    b.Property<int>("Position")
                        .HasColumnType("integer");

                    b.Property<int>("TrackId")
                        .HasColumnType("integer");

                    b.Property<int>("AlbumId")
                        .HasColumnType("integer");

                    b.HasKey("Position", "TrackId", "AlbumId");

                    b.HasIndex("AlbumId");

                    b.HasIndex("TrackId")
                        .IsUnique();

                    b.ToTable("AlbumTrack");
                });

            modelBuilder.Entity("Melodiy.Features.Artist.Entities.Artist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("ImageId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SpotifyId")
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.Property<bool>("Verified")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.HasIndex("ImageId");

                    b.HasIndex("Slug")
                        .IsUnique();

                    b.HasIndex("SpotifyId")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("Artists");
                });

            modelBuilder.Entity("Melodiy.Features.Authentication.Entities.AuthenticationDetails", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Salt")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Verifier")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id", "UserId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("AuthenticationDetails");
                });

            modelBuilder.Entity("Melodiy.Features.Authentication.Entities.RefreshToken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("Expires")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Token")
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("UserAgent")
                        .HasColumnType("text");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("Token")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("RefreshToken");
                });

            modelBuilder.Entity("Melodiy.Features.Image.Entities.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Path")
                        .HasColumnType("text");

                    b.Property<int>("Source")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("Path")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("Melodiy.Features.Playlist.Entities.Playlist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("ImageId")
                        .HasColumnType("integer");

                    b.Property<bool>("Public")
                        .HasColumnType("boolean");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("Step1Completedw")
                        .HasColumnType("boolean");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ImageId");

                    b.HasIndex("Slug")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("Playlists");
                });

            modelBuilder.Entity("Melodiy.Features.Playlist.Entities.PlaylistTrack", b =>
                {
                    b.Property<int>("TrackId")
                        .HasColumnType("integer");

                    b.Property<int>("PlaylistId")
                        .HasColumnType("integer");

                    b.Property<int>("Position")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("TrackId", "PlaylistId", "Position");

                    b.HasIndex("PlaylistId");

                    b.ToTable("PlaylistTracks");
                });

            modelBuilder.Entity("Melodiy.Features.Track.Entities.Track", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Duration")
                        .HasColumnType("integer");

                    b.Property<bool>("Explicit")
                        .HasColumnType("boolean");

                    b.Property<int?>("ImageId")
                        .HasColumnType("integer");

                    b.Property<string>("Path")
                        .HasColumnType("text");

                    b.Property<bool>("Public")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("ReleaseDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Source")
                        .HasColumnType("integer");

                    b.Property<string>("SpotifyId")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.Property<int>("Views")
                        .HasColumnType("integer");

                    b.Property<string>("YoutubeId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ImageId");

                    b.HasIndex("Slug")
                        .IsUnique();

                    b.HasIndex("SpotifyId")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("Tracks");
                });

            modelBuilder.Entity("Melodiy.Features.Track.Entities.TrackArtist", b =>
                {
                    b.Property<int>("TrackId")
                        .HasColumnType("integer");

                    b.Property<int>("ArtistId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsPrimary")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("TrackId", "ArtistId");

                    b.HasIndex("ArtistId");

                    b.ToTable("TracksArtists");
                });

            modelBuilder.Entity("Melodiy.Features.User.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Avatar")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Role")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("AlbumArtist", b =>
                {
                    b.HasOne("Melodiy.Features.Album.Entities.Album", null)
                        .WithMany()
                        .HasForeignKey("AlbumsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Melodiy.Features.Artist.Entities.Artist", null)
                        .WithMany()
                        .HasForeignKey("ArtistsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Melodiy.Features.Album.Entities.Album", b =>
                {
                    b.HasOne("Melodiy.Features.Image.Entities.Image", "Image")
                        .WithMany("Albums")
                        .HasForeignKey("ImageId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Melodiy.Features.User.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("Image");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Melodiy.Features.Album.Entities.AlbumTrack", b =>
                {
                    b.HasOne("Melodiy.Features.Album.Entities.Album", "Album")
                        .WithMany("AlbumTracks")
                        .HasForeignKey("AlbumId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Melodiy.Features.Track.Entities.Track", "Track")
                        .WithOne("AlbumTrack")
                        .HasForeignKey("Melodiy.Features.Album.Entities.AlbumTrack", "TrackId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Album");

                    b.Navigation("Track");
                });

            modelBuilder.Entity("Melodiy.Features.Artist.Entities.Artist", b =>
                {
                    b.HasOne("Melodiy.Features.Image.Entities.Image", "Image")
                        .WithMany("Artists")
                        .HasForeignKey("ImageId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Melodiy.Features.User.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("Image");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Melodiy.Features.Authentication.Entities.AuthenticationDetails", b =>
                {
                    b.HasOne("Melodiy.Features.User.Entities.User", "User")
                        .WithOne("AuthenticationDetails")
                        .HasForeignKey("Melodiy.Features.Authentication.Entities.AuthenticationDetails", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Melodiy.Features.Authentication.Entities.RefreshToken", b =>
                {
                    b.HasOne("Melodiy.Features.User.Entities.User", "User")
                        .WithMany("RefreshTokens")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Melodiy.Features.Image.Entities.Image", b =>
                {
                    b.HasOne("Melodiy.Features.User.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Melodiy.Features.Playlist.Entities.Playlist", b =>
                {
                    b.HasOne("Melodiy.Features.Image.Entities.Image", "Image")
                        .WithMany("Playlists")
                        .HasForeignKey("ImageId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Melodiy.Features.User.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Image");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Melodiy.Features.Playlist.Entities.PlaylistTrack", b =>
                {
                    b.HasOne("Melodiy.Features.Playlist.Entities.Playlist", "Playlist")
                        .WithMany("PlaylistTracks")
                        .HasForeignKey("PlaylistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Melodiy.Features.Track.Entities.Track", "Track")
                        .WithMany("PlaylistTracks")
                        .HasForeignKey("TrackId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Playlist");

                    b.Navigation("Track");
                });

            modelBuilder.Entity("Melodiy.Features.Track.Entities.Track", b =>
                {
                    b.HasOne("Melodiy.Features.Image.Entities.Image", "Image")
                        .WithMany("Tracks")
                        .HasForeignKey("ImageId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Melodiy.Features.User.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("Image");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Melodiy.Features.Track.Entities.TrackArtist", b =>
                {
                    b.HasOne("Melodiy.Features.Artist.Entities.Artist", "Artist")
                        .WithMany("TrackArtists")
                        .HasForeignKey("ArtistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Melodiy.Features.Track.Entities.Track", "Track")
                        .WithMany("TrackArtists")
                        .HasForeignKey("TrackId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Artist");

                    b.Navigation("Track");
                });

            modelBuilder.Entity("Melodiy.Features.Album.Entities.Album", b =>
                {
                    b.Navigation("AlbumTracks");
                });

            modelBuilder.Entity("Melodiy.Features.Artist.Entities.Artist", b =>
                {
                    b.Navigation("TrackArtists");
                });

            modelBuilder.Entity("Melodiy.Features.Image.Entities.Image", b =>
                {
                    b.Navigation("Albums");

                    b.Navigation("Artists");

                    b.Navigation("Playlists");

                    b.Navigation("Tracks");
                });

            modelBuilder.Entity("Melodiy.Features.Playlist.Entities.Playlist", b =>
                {
                    b.Navigation("PlaylistTracks");
                });

            modelBuilder.Entity("Melodiy.Features.Track.Entities.Track", b =>
                {
                    b.Navigation("AlbumTrack");

                    b.Navigation("PlaylistTracks");

                    b.Navigation("TrackArtists");
                });

            modelBuilder.Entity("Melodiy.Features.User.Entities.User", b =>
                {
                    b.Navigation("AuthenticationDetails")
                        .IsRequired();

                    b.Navigation("RefreshTokens");
                });
#pragma warning restore 612, 618
        }
    }
}
