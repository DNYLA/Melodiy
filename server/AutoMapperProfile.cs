using melodiy.server.Dtos.Playlist;
using melodiy.server.Dtos.PlaylistSong;
using melodiy.server.Dtos.Song;

namespace melodiy.server
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            _ = CreateMap<User, GetUserResponse>();
            _ = CreateMap<Playlist, GetPlaylistResponse>();
            _ = CreateMap<Playlist, GetTrendingPlaylistResponse>();
            _ = CreateMap<Song, GetSongResponse>();
            _ = CreateMap<PlaylistSong, GetPlaylistSongResponse>()
                .ForMember(dest => dest.PlaylistId, opt => opt.MapFrom(src => src.PlaylistUID))
                .ForMember(dest => dest.TrackId, opt => opt.MapFrom(src => src.SongUID));
        }
    }
}