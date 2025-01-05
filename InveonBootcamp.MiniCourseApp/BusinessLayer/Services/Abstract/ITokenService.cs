using CoreLayer.Configuration;
using CoreLayer.Dtos;
using EntityLayer.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Abstract
{
    public interface ITokenService
    {
        TokenDto CreateToken(UserApp userApp, IList<string> roles);
        ClientTokenDto CreateTokenByClient(Client client);
    }
}
