using System;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        // Command not returning anything
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set;}
        }

        public class Handler : IRequestHandler<Command, Result<Unit>> // Takes the command from above
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                if(activity == null) return null;

                _context.Remove(activity); // REmoves from memory at this stage

                var result = await _context.SaveChangesAsync() > 0; // Updates db

                if(!result) return Result<Unit>.Failure("Failed to delete activity");

                return Result<Unit>.Success(Unit.Value);
                
            }
        }
    }
}