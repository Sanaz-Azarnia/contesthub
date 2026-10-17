using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class ContestConfiguration : IEntityTypeConfiguration<Contest>
{
    public void Configure(EntityTypeBuilder<Contest> builder)
    {
        builder.HasKey(c => c.Id);
        builder.Property(c => c.Title).HasMaxLength(200).IsRequired();
        
        builder.HasMany(c => c.Questions)
               .WithOne(q => q.Contest)
               .HasForeignKey(q => q.ContestId)
               .OnDelete(DeleteBehavior.SetNull);
    }
}