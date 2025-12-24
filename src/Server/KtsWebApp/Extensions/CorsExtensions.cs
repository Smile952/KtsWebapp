using KTS.Configuration;
using Microsoft.AspNetCore.Cors.Infrastructure;

namespace KTS.Extensions
{
    public static class CorsExtensions
    {
        public static void AddCorsService(this IServiceCollection service)
        {
            service.AddCors(options => CorsConfiguration.GetCorsOptions(options));
        }
    }
}
