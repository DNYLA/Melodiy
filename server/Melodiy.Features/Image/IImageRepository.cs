namespace Melodiy.Features.Image;

using Melodiy.Features.Image.Entities;

public interface IImageRepository
{
    IQueryable<Image> AsQueryable();

    Task<Image?> GetByIdAsync(int id);

    Task AddAsync(Image image);
}
