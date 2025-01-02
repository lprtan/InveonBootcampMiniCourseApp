using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Concrete
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; } 
        public UserApp User { get; set; } 
        public DateTime OrderDate { get; set; } 
        public ICollection<OrderItem> OrderItems { get; set; } 
    }
}
