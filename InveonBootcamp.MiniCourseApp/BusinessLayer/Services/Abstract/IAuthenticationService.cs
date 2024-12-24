using Azure;
using CoreLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Abstract
{
    public interface IAuthenticationService
    {
        Task<ResponseDto<TokenDto>> LoginAsync(LoginDto loginDto);
        Task<ResponseDto<ClientTokenDto>> CreateTokenByClient(ClientLoginDto clientLoginDto);

        Task<ResponseDto<TokenDto>> CreateTokenByRefreshToken(string refreshToken);

        Task<ResponseDto<NoDataDto>> RevokeRefreshToken(string refreshToken);
    }
}
