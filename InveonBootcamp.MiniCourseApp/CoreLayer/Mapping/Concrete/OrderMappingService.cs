using AutoMapper;
using CoreLayer.Dtos;
using CoreLayer.Mapping.Abstract;
using EntityLayer.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLayer.Mapping.Concrete
{
    public class OrderMappingService : IOrderMappingService
    {
        private readonly IMapper _mapper;

        public OrderMappingService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public Order MapToOrder(CreateOrderDto createOrderDto)
        {
            return _mapper.Map<Order>(createOrderDto);
        }
    }
}
