using Application.Common.Interfaces;
using Application.Features.Admin.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Admin.Commands.UpdateContest;

public class UpdateContestCommandHandler(IApplicationDbContext ctx) : IRequestHandler<UpdateContestCommand, AdminContestDto>
{
    public async Task<AdminContestDto> Handle(UpdateContestCommand req, CancellationToken ct)
    {
        var contest = await ctx.Contests.Include(c => c.Questions).FirstOrDefaultAsync(c => c.Id == req.Id, ct) 
            ?? throw new KeyNotFoundException("Contest not found");

        contest.Update(req.Dto.Title, req.Dto.Description, req.Dto.Category, req.Dto.Difficulty, req.Dto.StartDate, req.Dto.EndDate);
        if (req.Dto.IsActive.HasValue) contest.SetIsActive(req.Dto.IsActive.Value);

        if (req.Dto.QuestionIds != null)
        {
            var existingQuestions = contest.Questions.ToList();
            foreach (var q in existingQuestions) q.AssignToContest(null);

            if (req.Dto.QuestionIds.Any())
            {
                var newQuestions = await ctx.Questions.Where(q => req.Dto.QuestionIds.Contains(q.Id)).ToListAsync(ct);
                foreach (var q in newQuestions) q.AssignToContest(contest.Id);
            }
        }

        await ctx.SaveChangesAsync(ct);
        return new AdminContestDto(
            contest.Id, 
            contest.Title, 
            contest.Description, 
            contest.Category ?? string.Empty, 
            contest.Difficulty ?? string.Empty, 
            contest.StartDate, 
            contest.EndDate, 
            contest.IsActive, 
            contest.Questions.Select(q => q.Id).ToList());
    }
}