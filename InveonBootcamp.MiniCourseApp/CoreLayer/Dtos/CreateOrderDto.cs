using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLayer.Dtos
{
    public class CreateOrderDto
    {
        public string UserId { get; set; } 
        public List<CreateOrderItemDto> OrderItems { get; set; }
    }
}
