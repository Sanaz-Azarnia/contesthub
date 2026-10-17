using Domain.Entities;
using Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);
        
        
        builder.OwnsOne(u => u.Username, vo =>
        {
            vo.Property(v => v.Value).HasColumnName("Username").HasMaxLength(50).IsRequired();
            vo.HasIndex(v => v.Value).IsUnique();  
        });

        builder.Property(u => u.Email).HasMaxLength(100);
        builder.HasIndex(u => u.Email).IsUnique();
        
        builder.Property(u => u.Role).HasConversion<string>().HasMaxLength(20);
        builder.Property(u => u.Provider).HasConversion<string>().HasMaxLength(20);
    }
}