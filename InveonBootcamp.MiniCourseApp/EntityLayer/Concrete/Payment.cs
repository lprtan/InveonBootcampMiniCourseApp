using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Concrete
{
    public class Payment
    {
        public int Id { get; set; }
        public decimal Amount { get; set; } 
        public DateTime PaymentDate { get; set; }  
        public int UserCourseId { get; set; }  
        public UserCourse UserCourse { get; set; }
    }
}
