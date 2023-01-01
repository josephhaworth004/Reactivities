using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
         // Command not a query
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        } 
       
        public class Handler : IRequestHandler<Command> {
            // constructor
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // Get activity from database to edit fields
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                // Mapper takes properties from class Activity and update the properties of the db
                _mapper.Map(request.Activity, activity); // Mapper injected in constructor
                // Save changes to DB
                await _context.SaveChangesAsync();
                // Tell api the work has completed
                return Unit.Value;
            }
        }
    }
}