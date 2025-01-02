using BusinessLayer.Services.Abstract;
using CoreLayer.Dtos;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Concrete
{
    public class UserRoleService : IUserRoleService
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<UserApp> _userManager;

        public UserRoleService(RoleManager<IdentityRole> roleManager, UserManager<UserApp> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }
        public async Task<ResponseDto<string>> AssignRoleToUserAsync(string email, string roleName)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return ResponseDto<string>.Fail("Kullanıcı bulunamadı.", 404, true);
            }

            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                return ResponseDto<string>.Fail("Böyle bir rol bulunamadı.", 404, true);
            }

            var result = await _userManager.AddToRoleAsync(user, roleName);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();
                return ResponseDto<string>.Fail(new ErrorDto(errors, true), 400);
            }

            return ResponseDto<string>.Success($"kullanıcıya {roleName} rolü başarıyla atandı.", 200);
        }

        public async Task<ResponseDto<string>> CreateRoleAsync(string roleName)
        {
            if (await _roleManager.RoleExistsAsync(roleName))
            {
                return ResponseDto<string>.Fail("Bu rol zaten mevcut.", 400, true);
            }

            var role = new IdentityRole(roleName);
            var result = await _roleManager.CreateAsync(role);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();
                return ResponseDto<string>.Fail(new ErrorDto(errors, true), 400);
            }

            return ResponseDto<string>.Success("Rol başarıyla oluşturuldu.", 200);
        }
    }
}
