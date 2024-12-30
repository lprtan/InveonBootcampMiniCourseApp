using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLayer.Dtos
{
    public class CreateOrderItemDto
    {
        public int CourseId { get; set; } 
        public decimal Price { get; set; } 
    }
}
