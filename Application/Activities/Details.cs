using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        // Query needs "using MediatR" , IRequest needs "Using Domain"
        // Below is going to be fetching data not receiving
        // Going to return a single activity
        public class Query : IRequest<Activity>
        {
            // Will have access to below inside our handler (ActivitiesController.cs)
            public Guid Id { get; set;} 
        }

        // Handler Class. Inherits the IRequest Handler
        // Takes Query as a parameter and returns a single Activity
        public class Handler : IRequestHandler<Query, Activity>
        {
            // Constructor to bring in DataContext needs using persistance
            private readonly DataContext _context;

            // Construtor
            public Handler (DataContext context) {
                _context = context;
            }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                // Id here is got from the query request injected just above
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}