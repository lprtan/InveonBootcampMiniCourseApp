using Azure;
using CoreLayer.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace InveonBootcamp.MiniCourseApp.Controllers
{
    public class CustomBaseController : ControllerBase
    {
        public IActionResult ActionResultInstance<T>(ResponseDto<T> response) where T : class
        {
            return new ObjectResult(response)
            {
                StatusCode = response.StatusCode
            };
        }
    }
}
