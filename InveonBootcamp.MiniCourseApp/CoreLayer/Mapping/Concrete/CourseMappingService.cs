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
    public class CourseMappingService : ICourseMappingService
    {
        private readonly IMapper _mapper;

        public CourseMappingService(IMapper mapper)
        {
            _mapper = mapper;
        }
        public Course MapToCourse(CreateCourseDto createCourseDto)
        {
            return _mapper.Map<Course>(createCourseDto);
        }
    }
}
