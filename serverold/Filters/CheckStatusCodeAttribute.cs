using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class CheckStatusCodeAttribute : ActionFilterAttribute
{
    public override void OnActionExecuted(ActionExecutedContext context)
    {
        if (context.Result is not ObjectResult result)
        {
            return; // Return if the result is not an ObjectResult
        }

        if (!result.StatusCode.HasValue)
        {
            return; //Shouldnt execute only here for typesaftey
        }

        // if (result.Value is ServiceResponse<object> serviceResponse)
        // if(result.Value != null && IsServiceResponseType(result.Value.GetType()))
        if (result.Value is IServiceResponse serviceResponse)
        {
            Console.WriteLine($"Attribute Code [{serviceResponse.StatusCode}]");

            //TODO: Replace switch with return StatusCodeResult(statuscode) need to test.
            IActionResult newActionResult = serviceResponse.StatusCode switch
            {
                400 => new BadRequestObjectResult(serviceResponse),
                401 => new UnauthorizedObjectResult(serviceResponse),
                404 => new NotFoundObjectResult(serviceResponse),
                409 => new ConflictObjectResult(serviceResponse),
                500 => new StatusCodeResult(500),
                _ => new ObjectResult(serviceResponse),
            };
            context.Result = newActionResult;
        }
    }
}