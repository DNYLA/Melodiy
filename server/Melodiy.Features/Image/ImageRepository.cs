namespace Melodiy.Features.Image;

using Melodiy.Features.Common.Context;
using Melodiy.Features.Image.Entities;

using Microsoft.EntityFrameworkCore;

public sealed class ImageRepository(MelodiyDbContext context) : IImageRepository
{
    private readonly DbSet<Image> _images = context.Set<Image>();

    public async Task<Image?> GetByIdAsync(int id)
    {
        return await _images.FindAsync(id);
    }

    public async Task AddAsync(Image image)
    {
        _images.Add(image);

        await context.SaveChangesAsync();
    }
}