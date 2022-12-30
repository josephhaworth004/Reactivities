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
        public class Query : IRequest<List<Activity>> {}

        // Handler class will use the IRequest handler from MediaR 
        // Pass it the query and what we are returning the List of Activity
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            // Constructor to inject out task. 
            // Bring in DataContext and call it context
            private readonly DataContext _context;
                        
            public Handler(DataContext context) {
                _context = context;    
            }

            // Returns a task of List of Activity
            // Because it's returning a task it needs to be an async method
            // Params: Request passing in, thats our query. Ignore CancellationToken for now
            public async Task<List<Activity>> Handle(Query request, CancellationToken token)
            {
                

                return await _context.Activities.ToListAsync();
            }
        }
    }
}