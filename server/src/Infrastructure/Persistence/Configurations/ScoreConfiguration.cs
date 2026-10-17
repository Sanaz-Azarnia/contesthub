using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class ScoreConfiguration : IEntityTypeConfiguration<Score>
{
    public void Configure(EntityTypeBuilder<Score> builder)
    {
        builder.HasKey(s => s.Id);
        builder.HasIndex(s => new { s.UserId, s.ContestId });
        builder.HasIndex(s => s.Points);

        builder.HasOne(s => s.User).WithMany().HasForeignKey(s => s.UserId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(s => s.Contest).WithMany().HasForeignKey(s => s.ContestId).OnDelete(DeleteBehavior.SetNull);
        builder.HasOne(s => s.Question).WithMany().HasForeignKey(s => s.QuestionId).OnDelete(DeleteBehavior.SetNull);
    }
}