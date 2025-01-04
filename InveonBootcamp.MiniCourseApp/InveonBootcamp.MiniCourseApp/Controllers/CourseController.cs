using BusinessLayer.Services.Abstract;
using CoreLayer.Dtos;
using CoreLayer.Mapping.Abstract;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace InveonBootcamp.MiniCourseApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : CustomBaseController
    {
        private readonly IGenericService<Course> _courseService;
        private readonly ICourseMappingService _courseMappingService;
        private readonly UserManager<UserApp> _userManager;

        public CourseController(IGenericService<Course> courseService, ICourseMappingService courseMappingService, UserManager<UserApp> userManager)
        {
            _courseService = courseService;
            _courseMappingService = courseMappingService;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetCourse()
        {
            var courses = await _courseService.Where(c => c.Category != null).Include(c => c.Category).ToListAsync();


            var courseDtos = courses.Select(c => new CourseDto
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                Instructor  = c.Instructor,
                Price = c.Price,
                CategoryName = c.Category.Name
            }).ToList();

            var response = ResponseDto<IEnumerable<CourseDto>>.Success(courseDtos, 200);

            return ActionResultInstance(response);
        }

        [HttpGet("GetDetailsCourse")]
        public async Task<IActionResult> GetDetailsCourse(int id)
        {
            var course = await _courseService.GetByIdAsync(id);

            var response = ResponseDto<Course>.Success(course, 200);

            return ActionResultInstance(response);

        }

        [HttpPost]
        public async Task<IActionResult> CreateCourse(CreateCourseDto createCourseDto)
        {
            var course = _courseMappingService.MapToCourse(createCourseDto);

            await _courseService.AddAsync(course);

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCourse(CreateCourseDto updateCourse, int id)
        {
            var course = await _courseService.GetByIdAsync(id);

            if (course == null)
            {
                var responseFail = ResponseDto<Course>.Fail("Kurs ID'si bulunamadı", 404, true);

                return ActionResultInstance(responseFail);
            }

            course.Title = updateCourse.Title;
            course.Description = updateCourse.Description;
            course.CategoryId = updateCourse.CategoryId;
            course.Instructor = updateCourse.Instructor;
            course.Price = updateCourse.Price;

            await _courseService.UpdateAsync(course);

            return Ok(ResponseDto<Course>.Success(course, 200));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var isExistCourse = await _courseService.GetByIdAsync(id);

            if (isExistCourse == null)
            {
                var responseFail = ResponseDto<Course>.Fail("Kurs ID'si bulunamadı", 404, true);

                return ActionResultInstance(responseFail);
            }

            await _courseService.DeleteAsync(id);

            return Ok(ResponseDto<Course>.Success(isExistCourse, 200));
        }

        [HttpGet("CourseAnalytics")]
        public async Task<IActionResult> GetCourseAnalytics(string email) 
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Instructor name is required.");
            }

            var user = await _userManager.FindByEmailAsync(email);

            var courseAnalytics = await _courseService
                .Where(c => c.Instructor == user.FullName)
                .Include(c => c.UserCourses) 
                    .ThenInclude(uc => uc.User) 
                .Include(c => c.Category) 
                .Select(c => new CourseAnalyticsDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    Description = c.Description,
                    Price = c.Price,
                    Instructor = c.Instructor,
                    CategoryName = c.Category.Name,
                    Students = c.UserCourses.Select(uc => new StudentInfoDto
                    {
                        FullName = uc.User.FullName,
                        Email = uc.User.Email
                    }).ToList() 
                })
                .ToListAsync();

            if (!courseAnalytics.Any())
            {
                return Ok(new List<CourseAnalyticsDto>());
            }

            return Ok(courseAnalytics);
        }
    }
}
