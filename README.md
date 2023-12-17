<h1 align="center">Melodiy</h1>
<p align="center"><img src="./screenshots/logo.png" alt="logo" width="250" /></p>

<p align="center">
  <a href="https://github.com/DNYLA/Melodiy/pkgs/container/melodiy-server"><img src="https://img.shields.io/github/v/release/DNYLA/Melodiy?label=version&style=for-the-badge" /></a>
  <a href="https://melodiy.net"><img src="https://img.shields.io/website?label=DEMO&style=for-the-badge&url=https%3A%2F%2Fmelodiy.net" /></a>
  <a href="https://github.com/DNYLA/Melodiy/issues"><img src="https://img.shields.io/github/issues-raw/DNYLA/Melodiy?label=ISSUES&style=for-the-badge" /></a>
  <a href="/LICENSE"><img src="https://img.shields.io/github/license/DNYLA/Melodiy?style=for-the-badge" /></a>
</p>

Open Source Music streaming platform which allows users to combine publicly released music with their files whilst still being able to access your music from anywhere. Currently uses Spotify Api (optional) and YouTube to search and listen to publicly released music.

Built using Next.js and C#, Desktop and mobile applications are on the way soon.

The official Melodiy.net, which runs on the latest `dev` build (there may be bugs, as new features are tested on here too): [https://melodiy.net/](https://melodiy.net/)

### Contents

- [Screenshots](#screenshots)
- [Setup](#set-up)
- [Contributing](CONTRIBUTING.md)
- [Getting Help](#getting-help)

# Screenshots

<p align="center">

| Homepage                                                   | Your Files                                                              |
| ---------------------------------------------------------- | ----------------------------------------------------------------------- |
| <img src="./screenshots/homepage.png" alt="Home Page" /> | <img src="./screenshots/your-files.png" alt="Your Files" /> |

| Create Playlist                                            | Upload Song                                                             |
| -----------------------------------------------------------| ----------------------------------------------------------------------- |
| <img src="./screenshots/create-playlist-modal.png" alt="Create Playlist Modal" /> | <img src="./screenshots/upload-song-modal.png" alt="Upload Song Modal" /> |

| Search                                                              | Artist                                                           |
| ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| <img src="./screenshots/search-page.png" alt="Search Page" /> | <img src="./screenshots/artist-page.gif" alt="Artist Page" /> |

| Right Click Menu (Your Files)                                          | Right Click Menu                                              |
| ---------------------------------------------------------------------- | ------------------------------------------------------------- |
| <img src="./screenshots/context-menu-files.png" alt="Context Menu (Your Files)" /> | <img src="./screenshots/context-menu.png" alt="Context Menu" /> |

</p>

# Set Up

## Backend
Setup is straightforward for the backend.
Pre-requisites
* Postgress Database
* Docker
* Spotify Api Key (Optional Remove the "Spotify" section in app settings if you don't want to include Spotify searches).
* Supabase Application

1. Copy docker-compose.yml and appsetting.json and edit appsetting.json to include your Supabase, Spotify and Database settings.
2. On your project for supabase navigate to Database -> Functions -> Create new Function.
3. Setup the new function like below

| Key        | Value               |
|------------|---------------------|
| Name       | storage_file_exists |
| Schema     | public              |
| Return Type | bool               |
| Arg1       | path (text)         |
| Arg2       | bucket (text)       |
| Definition | 
```
BEGIN RETURN
  (SELECT EXISTS
     (SELECT id
      FROM storage.objects
      WHERE bucket_id=BUCKET
        AND name=PATH
      LIMIT 1));
END;
```
<img src="./screenshots/supabase-storage-function.png" alt="Supabase Storage Function" />

4. Leave everything else as default and click confirm.
5. Everything else (Bucket creation, database migrations, etc) will be handled by the server on every launch so no other setup is needed.
6. docker compose up to run the server.

## Frontend
The front end can not be included as a docker image as the public environment variables are compiled at run time. It is recommended that you fork this repository and use Vercel to host the front end. Alternatively, you can use the docker file and comment out the docker-compose section in the docker-compose.dev.yml. Choosing to host the frontend using docker will require you to build the frontend using the Dockerfile.
# Getting Help

If something isn't working for you or you are stuck, Create an [issue](https://github.com/DNYLA/Melodiy/issues/new) or [discussion](https://github.com/DNYLA/Melodiy/discussions) if you need any help with setting up or have bug fixes/feature requests. is the best way to get help! Every type of issue is accepted, so don't be afraid to ask anything!
