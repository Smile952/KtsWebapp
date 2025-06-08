using Application.Services;
using Interface.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Interface
{
    public class TokenProvider (IConfiguration configuration)
    {

        public string Create (UserService service, UserModel model)
        {
            var users = service.Read().Where(x => x.Email == model.Email && x.Password == model.Password);
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, model.Name) };
            var secretKey = "53db4fdf8da5212b2896c62a738794c35fb9ba73c8b6d9adc73a489ba1241149e1f569a2e244c244e8a5ae6b5de5fea6c12e4c190b9c0178b274a52e0bf62680";
            var jwt = new JwtSecurityToken(
                issuer: model.Name,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)), SecurityAlgorithms.HmacSha256));
            var handler = new JwtSecurityTokenHandler();
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
