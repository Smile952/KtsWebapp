using Microsoft.AspNetCore.Cors.Infrastructure;

namespace KTS.Configuration
{
    public class CorsConfiguration
    {

        public static CorsOptions GetCorsOptions(CorsOptions options)
        {
            const string corsName = "_ktsWebAppCors";

            options.AddPolicy(
                name: corsName,
                policy =>
                {
                    policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });


            return options;
        } 

    }
}
