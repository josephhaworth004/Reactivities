using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        // Will derive from and use the interface from Mediator
        // Tell class what it will return - a List object of The Activity object
        // Can have parameters but don't need them as it just returns a list
        public class Query : IRequest<List<Activity>> {} // The MediatR Query

        // Handler class will use the IRequest interface from MediatR 
        // Pass it the query as 1st parameter and what we are returning, List of Activity, as the 2nd
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            // Constructor to inject our task. 
            private readonly DataContext _context;
            // Bring in DataContext and call it context
            public Handler(DataContext context) {
                _context = context;    
            }

            // Returns a task of List of Activity
            // Because at some point it's returning a task it needs to be an async method
            // Params: Request passing in, thats our query. Ignore CancellationToken for now
            public async Task<List<Activity>> Handle(Query request, CancellationToken token)
            {
                
                // List of activities
                return await _context.Activities.ToListAsync();
            }
        }
    }
}