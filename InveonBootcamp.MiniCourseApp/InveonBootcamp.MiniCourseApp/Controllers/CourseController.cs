using BusinessLayer.Services.Abstract;
using CoreLayer.Dtos;
using CoreLayer.Mapping.Abstract;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Mvc;

namespace InveonBootcamp.MiniCourseApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : CustomBaseController
    {
        private readonly IGenericService<Course> _courseService;
        private readonly ICourseMappingService _courseMappingService;

        public CourseController(IGenericService<Course> courseService, ICourseMappingService courseMappingService)
        {
            _courseService = courseService;
            _courseMappingService = courseMappingService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCourse()
        {
            var courses = await _courseService.GetAllAsync();

            var response = ResponseDto<IEnumerable<Course>>.Success(courses, 200);

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
    }
}
