using AdventuresService.API.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace AdventureGame.API.Utilities
{
    public class ExceptionFilter : IActionFilter
    {
        private readonly ILogger logger;
        public ExceptionFilter(ILogger<ExceptionFilter> logger)
        {
            this.logger = logger;
        }
        public void OnActionExecuting(ActionExecutingContext context) {
            logger.LogInformation($"Executing: {context.ActionDescriptor.DisplayName}");
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            logger.LogInformation($"Executing: {context.ActionDescriptor.DisplayName}");
            if (context.Exception is ApiException exception)
            {
                logger.LogError(context.Exception, context.Exception.Message);
                context.Result = new ObjectResult(exception.Data)
                {
                    StatusCode = (int)exception.Code
                };
                context.ExceptionHandled = true;
            }
        }
    }
}
