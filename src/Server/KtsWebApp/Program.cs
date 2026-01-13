using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using KTS.Extensions;
using KTS.Configuration;

internal class Program
{
    private static void Main(string[] args)
    {

        AppContext.SetSwitch(
            "System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport",
            true
        );

        EnvConfiguration.LoadEnvironmentVariables();

        var builder = WebApplication.CreateBuilder(args);

        builder.AddServices();

        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
        {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(EnvConfiguration.SecretKey)),
                        ClockSkew = TimeSpan.Zero
                };
        });

        builder.Services.AddAuthorization();

        builder.AddCustomServices();

        builder.Services.AddControllers();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.WebHost.UseUrls(EnvConfiguration.Addr);

        var app = builder.Build();

        const string corsName = "_ktsWebAppCors";
        app.UseCors(corsName);

        if (app.Environment.IsDevelopment())
        {
                app.UseSwagger();
                app.UseSwaggerUI();
        }
                
        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}