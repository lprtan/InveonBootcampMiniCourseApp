using AutoMapper;
using CoreLayer.Dtos;
using EntityLayer.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CoreLayer.Mapping.Concrete
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserApp, UserAppDto>();
            CreateMap<CreateCourseDto, Course>();
        }
    }
}
