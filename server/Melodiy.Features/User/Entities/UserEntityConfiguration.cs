namespace Melodiy.Features.User.Entities;

using Melodiy.Features.Authentication.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class UserEntityConfiguration : IEntityTypeConfiguration<UserEntity>
{
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