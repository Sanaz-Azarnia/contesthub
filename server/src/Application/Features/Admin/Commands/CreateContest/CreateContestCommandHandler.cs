using Application.Common.Interfaces;
using Application.Features.Admin.DTOs;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Admin.Commands.CreateContest;

public class CreateContestCommandHandler(IApplicationDbContext ctx) : IRequestHandler<CreateContestCommand, AdminContestDto>
{
    public async Task<AdminContestDto> Handle(CreateContestCommand req, CancellationToken ct)
    {
        var contest = Contest.Create(req.Dto.Title, req.Dto.Description, req.Dto.Category, req.Dto.Difficulty, req.Dto.StartDate, req.Dto.EndDate);
        if (req.Dto.IsActive.HasValue) contest.SetIsActive(req.Dto.IsActive.Value);
        
        ctx.Contests.Add(contest);
        await ctx.SaveChangesAsync(ct);

        if (req.Dto.QuestionIds != null && req.Dto.QuestionIds.Any())
        {
            var questions = await ctx.Questions.Where(q => req.Dto.QuestionIds.Contains(q.Id)).ToListAsync(ct);
            foreach (var q in questions) q.AssignToContest(contest.Id);
            await ctx.SaveChangesAsync(ct);
        }

        var result = await ctx.Contests.Include(c => c.Questions).FirstAsync(c => c.Id == contest.Id, ct);
        return new AdminContestDto(
            result.Id, 
            result.Title, 
            result.Description, 
            result.Category ?? string.Empty, 
            result.Difficulty ?? string.Empty, 
            result.StartDate, 
            result.EndDate, 
            result.IsActive, 
            result.Questions.Select(q => q.Id).ToList());
    }
}