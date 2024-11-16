using Melodiy.Integrations.Common;

namespace Melodiy.Features.Image;

using Melodiy.Features.Common.Context;
using Melodiy.Features.Image.Entities;

using Microsoft.EntityFrameworkCore;

public sealed class ImageRepository(MelodiyDbContext context) : IImageRepository
{
    private readonly DbSet<Image> _images = context.Set<Image>();

    public IQueryable<Image> AsQueryable()
    {
        return _images.AsQueryable();
    }

    public async Task<Image?> GetByIdAsync(int id)
    {
        return await _images.FindAsync(id);
    }

    public async Task<Image?> GetByPath(string path, SourceType? source)
    {
        if (source == null) return await _images.Where(x => x.Path == path).FirstOrDefaultAsync();

        return await _images.Where(x => x.Path == path && x.Source == source).FirstOrDefaultAsync();
    }

    public async Task AddAsync(Image image)
    {
        if (string.IsNullOrWhiteSpace(image.Path)) return;
        var exists = await GetByPath(image.Path, image.Source);
        if (exists != null)
        {
            image = exists;
            return;
        }

        _images.Add(image);
        await context.SaveChangesAsync();
    }
}