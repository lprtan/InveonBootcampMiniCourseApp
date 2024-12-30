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
    public class CategoryMappingService : ICategoryMappingService
    {
        private readonly IMapper _mapper;

        public CategoryMappingService(IMapper mapper)
        {
            _mapper = mapper;
        }
        public Category MapToCategory(CreateCatagoryDto createCategoryDto)
        {
            return _mapper.Map<Category>(createCategoryDto);
        }
    }
}
