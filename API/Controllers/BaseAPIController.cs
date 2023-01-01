using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //Controllers decorated with this attribute are configured with features and behavior targeted at // improving the developer experience for building APIs.
    [ApiController] // Attribute 
    [Route("api/[controller]")]
    public class BaseAPIController : ControllerBase // All my controllers derive from ControllerBase
    {
        private IMediator _mediator;
    
        //Can be used in any classes derived of this one
        // => as we are going to return one of two options 
        // ??= if 1st arg is null, assign to the right of ??= or if it already exists, return it.
        protected IMediator Mediator => _mediator ??=
            HttpContext.RequestServices.GetService<IMediator>();
    }
}