using BusinessLayer.Services.Abstract;
using CoreLayer.Dtos;
using CoreLayer.Mapping.Abstract;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Mvc;

namespace InveonBootcamp.MiniCourseApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatagoryController : CustomBaseController
    {
        private readonly IGenericService<Category> _catagoryService;
        private readonly ICategoryMappingService _categoryMappingService;
        public CatagoryController(IGenericService<Category> catagoryService, ICategoryMappingService categoryMappingService)
        {
            _catagoryService = catagoryService;
            _categoryMappingService = categoryMappingService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCatagories()
        {
            var catagories = await _catagoryService.GetAllAsync();

            return Ok(catagories);
        }

        [HttpPost]
        public async Task<IActionResult> AddCatagory(CreateCatagoryDto createCatagoryDto)
        {
            var catagory = _categoryMappingService.MapToCategory(createCatagoryDto);

            await _catagoryService.AddAsync(catagory);

            return Ok();
        }
    }
}
