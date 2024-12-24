using Azure;
using BusinessLayer.Services.Abstract;
using CoreLayer.Dtos;
using CoreLayer.Mapping.Abstract;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Concrete
{
    public class UserService : IUserService
    {
        private readonly UserManager<UserApp> _userManager;
        private readonly IUserMappingService _userMappingService;
        public UserService(UserManager<UserApp> userManager, IUserMappingService userMappingService)
        {
            _userManager = userManager;
            _userMappingService = userMappingService;  
        }

        public async Task<ResponseDto<UserAppDto>> CreateUserAsync(CreateUserDto createUserDto)
        {
            var user = new UserApp { Email = createUserDto.Email, FullName = createUserDto.FullName };

            var result = await _userManager.CreateAsync(user, createUserDto.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();
                return ResponseDto<UserAppDto>.Fail(new ErrorDto(errors, true), 400);
            }

            var userAppDto = _userMappingService.MapToUserAppDto(user);
            return ResponseDto<UserAppDto>.Success(userAppDto, 200); 
        }

        public async Task<ResponseDto<UserAppDto>> GetUserByMailAsync(string mail)
        {
            var user = await _userManager.FindByEmailAsync(mail);

            if (user == null)
            {
                return ResponseDto<UserAppDto>.Fail("E-mail adresi bulunamadı", 404, true);
            }

            var userAppDto = _userMappingService.MapToUserAppDto(user);

            return ResponseDto<UserAppDto>.Success(userAppDto, 200);
        }
    }
}
