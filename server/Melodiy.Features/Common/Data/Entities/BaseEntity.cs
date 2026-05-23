namespace Melodiy.Features.Common.Data.Entities;

public abstract class BaseEntity
{
    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }
}