using BusinessLayer.Services.Abstract;
using CoreLayer.Dtos;
using CoreLayer.Mapping.Abstract;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Mvc;

namespace InveonBootcamp.MiniCourseApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : CustomBaseController
    {
        private readonly IGenericService<Order> _orderService;
        private readonly IOrderMappingService _orderMappingService;

        public OrderController(IGenericService<Order> genericService, IOrderMappingService orderMappingService)
        {
            _orderService = genericService;
            _orderMappingService = orderMappingService;
        }


        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateOrderDto orderDto)
        {
            var order = _orderMappingService.MapToOrder(orderDto);

            await _orderService.AddAsync(order);

            return Ok(ResponseDto<Order>.Success(200));
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetOrderDetails(int id)
        {
            var order = await _orderService.GetByIdAsync(id);

            if (order == null)
            {
                var responseFail = ResponseDto<Order>.Fail("Sipariş bulunamadı", 404, true);

                return ActionResultInstance(responseFail);
            }

            var response = ResponseDto<Order>.Success(order, 200);

            return ActionResultInstance(response);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> RemoveOrder(int id)
        {
            var order = await _orderService.GetByIdAsync(id);

            if (order == null)
            {
                var responseFail = ResponseDto<Order>.Fail("Sipariş bulunamadı", 404, true);

                return ActionResultInstance(responseFail);
            }

            await _orderService.DeleteAsync(id);

            return Ok(ResponseDto<Course>.Success(200));
        }
    }
}
