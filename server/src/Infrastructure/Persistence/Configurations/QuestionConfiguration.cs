using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class QuestionConfiguration : IEntityTypeConfiguration<Question>
{
    public void Configure(EntityTypeBuilder<Question> builder)
    {
        builder.HasKey(q => q.Id);

        builder.Property(q => q.Category).HasMaxLength(200).IsRequired();
        builder.Property(q => q.Difficulty).HasMaxLength(20).IsRequired();
        builder.Property(q => q.Type).HasMaxLength(20).IsRequired();
        builder.Property(q => q.QuestionText).IsRequired();
        builder.Property(q => q.CorrectAnswer).IsRequired();

         
        builder.Property(q => q.IncorrectAnswers)
               .HasField("_incorrectAnswers")
               .HasColumnName("IncorrectAnswers")
               .HasColumnType("jsonb");

         
        builder.HasIndex(q => new { q.Category, q.Difficulty });
        builder.HasIndex(q => q.ContestId);

         
        builder.HasOne(q => q.Contest)
               .WithMany(c => c.Questions)
               .HasForeignKey(q => q.ContestId)
               .OnDelete(DeleteBehavior.SetNull);
    }
}