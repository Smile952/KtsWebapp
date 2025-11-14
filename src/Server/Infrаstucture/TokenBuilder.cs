using Application.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastucture
{
    public class TokenBuilder
    {
        private string _secretKey;
        public TokenBuilder() { }
        public TokenBuilder(string secretKey)
        {
            _secretKey = secretKey;
        }

        public string Create(UserService service, string email, string password)
        {
            var user = service.Read().FirstOrDefault(x => x.Email == email);
            if (user == null) return null;

            var claims = new List<Claim> {
                new Claim("name", user.Name),
                new Claim("role", user.PermissionId.ToString()),
                new Claim("email", user.Email)
            };

            var secretKey = _secretKey;

            var jwt = new JwtSecurityToken(
                issuer: "KtsApp",
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(10),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)), SecurityAlgorithms.HmacSha256));

            var handler = new JwtSecurityTokenHandler();

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

    }
}
