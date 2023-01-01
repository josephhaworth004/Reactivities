using Domain;
using MediatR;
using Persistence;

namespace Application
{
    public class Create
    {
        // Command does not return anything. We are passing IRequestor
        // This is the difference between a command and a query.
        // Queries return data, commands do not
        public class Command : IRequest {
            // Pass an object of type Activity to this handler when we create it
            // Below is what we want to receive as a parameter from our API
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            // Constructor injects DataContext so we can persist our changes 
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
                                          
            // Our request should hold an activity object
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}