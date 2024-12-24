using CoreLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Abstract
{
    public interface IUserRoleService
    {
        Task<ResponseDto<string>> CreateRoleAsync(string roleName);
        Task<ResponseDto<string>> AssignRoleToUserAsync(string email, string roleName);
    }
}
