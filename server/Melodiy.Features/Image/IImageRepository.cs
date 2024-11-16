namespace Melodiy.Features.Image;

using Melodiy.Features.Image.Entities;
using Melodiy.Integrations.Common;

public interface IImageRepository
{
    IQueryable<Image> AsQueryable();

    Task<Image?> GetByIdAsync(int id);

    Task<Image?> GetByPath(string path, SourceType? source);

    Task AddAsync(Image image);
}
