using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseAPIController : ControllerBase
    {
        private IMediator _mediator;
    
        //Can be used in any classes derived of this one
        // => as we are going to return one of two options 
        // ??= of 1st arg is null, assign to the right of =??=
        // This is here in case _mediator has already been assigned
        protected IMediator Mediator => _mediator ??=
            HttpContext.RequestServices.GetService<IMediator>();
    }
}