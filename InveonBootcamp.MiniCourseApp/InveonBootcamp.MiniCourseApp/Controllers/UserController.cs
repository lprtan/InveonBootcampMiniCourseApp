using BusinessLayer.Services.Abstract;
using CoreLayer.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace InveonBootcamp.MiniCourseApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : CustomBaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(CreateUserDto createUserDto)
        {
            var user = await _userService.CreateUserAsync(createUserDto);

            return ActionResultInstance(user);
        }

        [HttpGet]
        public async Task<IActionResult> GetUser(string mail)
        {
            var user = await _userService.GetUserByMailAsync(mail);

            return ActionResultInstance(user);
        }
    }
}
