using BusinessLayer.Services.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace InveonBootcamp.MiniCourseApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRoleController : CustomBaseController
    {
        private readonly IUserRoleService _userRoleService;

        public UserRoleController(IUserRoleService userRoleService)
        {
            _userRoleService = userRoleService;
        }

        [HttpPost("CreateRole")]
        public async Task<IActionResult> CreateRole(string roleName)
        {
            var createRoleName = await _userRoleService.CreateRoleAsync(roleName);

            return ActionResultInstance(createRoleName);
        }

        [HttpPost]
        public async Task<IActionResult> AssignRoleToUserAsync(string email, string roleName)
        {
            var assignRoleToUser = await _userRoleService.AssignRoleToUserAsync(email, roleName);

            return ActionResultInstance(assignRoleToUser);
        }
    }
}
