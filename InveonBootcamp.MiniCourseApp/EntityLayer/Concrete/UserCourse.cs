using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Concrete
{
    public class UserCourse
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public UserApp? User { get; set; }
        public int CourseId { get; set; }
        public Course? Course { get; set; }
    }
}
