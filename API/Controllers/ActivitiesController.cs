using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using Application;

namespace API.Controllers
{
    // class ActivitiesControl inherits from BaseAPIController
    // [ApiController] 
    // [Route("api/[controller]")]
    public class ActivitiesController : BaseAPIController
    {
        // Define end-points
        // Utilize Dependency Injection for putting datacontext in api controller class 
        [Microsoft.AspNetCore.Mvc.HttpGet] // Will use: api//activities. 
       
        //Returns list of activities.
        // In the form <ActionResult>
        public async Task<Microsoft.AspNetCore.Mvc.ActionResult<List<Activity>>> GetActivities()
        {
            // Use send to send the query (<List<Activity>>> GetActivities()) to handlers
            return await Mediator.Send(new List.Query());
        }

        [Microsoft.AspNetCore.Mvc.HttpGet("{id}")] // Route parameter: api/activities/GUID      
        // Register Mediator as a service inside our program class
        public async Task <ActionResult<Activity>> GetActivity(Guid id)
        {
            // Runs the query set up in Details.cs
            return await Mediator.Send(new Details.Query{Id = id});        
        }
        
       [Microsoft.AspNetCore.Mvc.HttpPost] 
        public async Task<IActionResult> CreateActivity(Activity activity) {
            // Something needs to be returned
            return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
        }

        [Microsoft.AspNetCore.Mvc.HttpPut("{id}")]
        //[HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));    
        }

        [Microsoft.AspNetCore.Mvc.HttpDelete("{id}")]

        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }


    }
}