﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Concrete
{
    public class Course
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string? Instructor { get; set; }
        public int CategoryId { get; set; } 
        public Category? Category { get; set; }
        public ICollection<UserCourse>? UserCourses { get; set; }
    }
}
