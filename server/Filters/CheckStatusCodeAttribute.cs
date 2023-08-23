using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class CheckStatusCodeAttribute : ActionFilterAttribute
{
    public override void OnActionExecuted(ActionExecutedContext context)
    {
        if (!(context.Result is ObjectResult result)) return; // Return if the result is not an ObjectResult
        if (!result.StatusCode.HasValue) return; //Shouldnt execute only here for typesaftey
        
        // if (result.Value is ServiceResponse<object> serviceResponse)
        // if(result.Value != null && IsServiceResponseType(result.Value.GetType()))
        if (result.Value is IServiceResponse serviceResponse)
        {
            IActionResult newActionResult;
            switch (serviceResponse.StatusCode)
            {
                case 400:
                    newActionResult = new BadRequestObjectResult(serviceResponse);
                    break;
                case 401:
                    newActionResult = new UnauthorizedObjectResult(serviceResponse);
                    break;
                case 404:
                    newActionResult = new NotFoundObjectResult(serviceResponse);
                    break;
                case 500:
                    newActionResult = new StatusCodeResult(500);
                    break;
                default:
                    newActionResult = new ObjectResult(serviceResponse);
                    break;
            }

            context.Result = newActionResult;
        }
    }
}