using System;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        // Command not returning anything
        public class Command : IRequest
        {
            public Guid Id { get; set;}
        }

        public class Handler : IRequestHandler<Command> // Takes the command from above
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // Get activity - no error trapping implemented yet
                var activity = await _context.Activities.FindAsync(request.Id);

                _context.Remove(activity); // REmoves from memory at this stage

                await _context.SaveChangesAsync(); // Updates db

                return Unit.Value;
            }
        }
    }
}