using BusinessLayer.Services.Abstract;
using CoreLayer.Dtos;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InveonBootcamp.MiniCourseApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserCourseController : Controller
    {
        private readonly IGenericService<UserCourse> _userCourseController;
        private readonly UserManager<UserApp> _userManager;

        public UserCourseController(IGenericService<UserCourse> userCourseController, UserManager<UserApp> userManager)
        {
            _userCourseController = userCourseController;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> AddToUserCourse(string email, int courseId)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return BadRequest();
            }

            var userCourse = new UserCourse
            {
                UserId = user.Id,
                CourseId = courseId
            };

            await _userCourseController.AddAsync(userCourse);

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetUserCourse(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return BadRequest();
            }

            var userCourses = await _userCourseController
                   .Where(uc => uc.UserId == user.Id)
                   .Include(uc => uc.Course)
                   .ThenInclude(c => c.Category)
                   .ToListAsync();

            if (!userCourses.Any())
            {
                return NotFound("Kullanıcıya ait kurs bulunamadı.");
            }

            var courseDetails = userCourses.Select(uc => new CourseDto
            {
                Id = uc.CourseId,
                Title = uc.Course?.Title,
                Description = uc.Course?.Description,
                Price = uc.Course?.Price ?? 0,
                Instructor = uc.Course?.Instructor,
                CategoryName = uc.Course?.Category?.Name
            }).ToList();

            return Ok(courseDetails);
        }
    }
}
