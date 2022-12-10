using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ActivitiesController : BaseAPIController
    {
        private readonly Persistence.DataContext __context;
        
        public ActivitiesController(Persistence.DataContext _context)
        {
            __context = _context;
            
            
        }

        [Microsoft.AspNetCore.Mvc.HttpGet] //api//activities
        public async Task<Microsoft.AspNetCore.Mvc.ActionResult<List<Domain.Activity>>> GetActivities()
        {
            return await __context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] // api/activities/dfghdfg
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await __context.Activities.FindAsync(id);
        }
    
    }
}