using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        //Query needs using MediatR , IRequest needs Domain
        // Below is going to be fetching data not receiving
        // Going to return a single activity
        public class Query : IRequest<Activity>
        {
            // will have access to below inside our handler (ActivitiesController.cs
            //Guid need using System
            public Guid Id { get; set;} 
        }

        // Hander Class. Inherites the IRequest Handler
        // Takes Query as a parma and returns a single Activity
        public class Handler : IRequestHandler<Query, Activity>
        {
            // Contructor to bring in DataContext needs using persistance
            private readonly DataContext _context;
            public Handler (DataContext context) {
            _context = context;
                
            }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                // 
                return await _context.Activities.FindAsync(request.Id); // Id here is got from the
                // query request injected just above
            }
        }
    }
}