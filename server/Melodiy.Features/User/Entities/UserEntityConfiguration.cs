namespace Melodiy.Features.User.Entities;

using Melodiy.Features.Authentication.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class UserEntityConfiguration : IEntityTypeConfiguration<UserEntity>
{
    /// <summary>
    /// Configures the Entity Framework Core mapping for UserEntity, including its relationships and navigation requirements.
    /// </summary>
    /// <param name="builder">The entity type builder used to configure UserEntity.</param>
    /// <remarks>
    /// - Sets a required one-to-one relationship between UserEntity and AuthenticationDetails using AuthenticationDetails.UserId as the foreign key and cascade delete.
    /// - Marks the AuthenticationDetails navigation on UserEntity as required.
    /// - Sets a required one-to-many relationship between UserEntity and RefreshToken using RefreshToken.UserId as the foreign key with cascade delete.
    /// </remarks>
    public void Configure(EntityTypeBuilder<UserEntity> builder)
    {
        // User -> AuthenticationDetails (1:1)
        builder.HasOne(u => u.AuthenticationDetails)
               .WithOne(a => a.User)
               .HasForeignKey<AuthenticationDetails>(a => a.UserId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

        builder.Navigation(u => u.AuthenticationDetails).IsRequired();

        // Configure User -> RefreshTokens (1:Many)
        builder.HasMany(u => u.RefreshTokens)
               .WithOne(rt => rt.User)
               .HasForeignKey(rt => rt.UserId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}