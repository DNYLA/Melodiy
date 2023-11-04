using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Domain.Entities;
using Melodiy.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace Melodiy.Tests.Fixtures;

public class DataContextFixture : IDisposable
{
    public DataContext Context { get; private set; }

    public DataContextFixture()
    {
        var options = new DbContextOptionsBuilder<DataContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        Context = new DataContext(options);
        Context.Database.EnsureCreated();
        // Seed(Context);
    }

    public async void SeedUsers(DataContext context)
    {
        await context.SaveChangesAsync();
    }

    public void Dispose()
    {
        Context.Database.EnsureDeleted();
        Context.Dispose();
    }
}