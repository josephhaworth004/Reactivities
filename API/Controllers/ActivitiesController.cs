using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using Application;

namespace API.Controllers
{
    public class ActivitiesController : BaseAPIController
    {

        [Microsoft.AspNetCore.Mvc.HttpGet] //api//activities
        // In the line below I changed domain.Activity to just Activity
        public async Task<Microsoft.AspNetCore.Mvc.ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [Microsoft.AspNetCore.Mvc.HttpGet("{id}")] 
        
        // Register Mediator as a service inside our program calss
        public async Task <ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});        
        }
       
        //[Microsoft.AspNetCore.Mvc.HttpGet("{id}")] 
       [Microsoft.AspNetCore.Mvc.HttpPost] 
        public async Task<IActionResult> CreateActivity(Activity activity) {
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