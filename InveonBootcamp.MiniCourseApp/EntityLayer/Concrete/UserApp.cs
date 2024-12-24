using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Concrete
{
    public class UserApp : IdentityUser
    {
        public string? FullName { get; set; }
        public ICollection<UserCourse>? UserCourses { get; set; }
    }
}
