using Melodiy.Data;
using Microsoft.EntityFrameworkCore;

namespace Tests;

public class DataContextFixture : IDisposable
{
    public DataContext _context { get; private set; }

    public DataContextFixture()
    {
        var options = new DbContextOptionsBuilder<DataContext>();

    }
    public void Dispose()
    {
        _context.Dispose();
    }
}