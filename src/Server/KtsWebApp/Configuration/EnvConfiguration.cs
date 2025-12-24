using DotNetEnv;

namespace KTS.Configuration
{
    public static class EnvConfiguration
    {
        public static string SecretKey { get; private set; } = string.Empty;
        public static string Addr { get; private set; } = string.Empty;
        public static string DbAddr { get; private set; } = string.Empty;
        public static string DbUser { get; private set; } = string.Empty;
        public static string DbPassword { get; private set; } = string.Empty;
        public static string ConnectionString { get; private set; } = string.Empty;

        public static void LoadEnvironmentVariables()
        {
            string directory = Directory.GetCurrentDirectory();
            string envPath = Path.Combine(directory, ".env");
            Env.Load(directory + "/.env");

            SecretKey = Env.GetString("TOKEN");
            Addr = Env.GetString("LISTENING_ADDR");

            DbAddr = Env.GetString("DATABASE_ADDR");
            DbUser = Env.GetString("DATABASE_USER");
            DbPassword = Env.GetString("DATABASE_PASSWORD");

            ConnectionString = $"Server={DbAddr},1433;TrustServerCertificate=true;Database=KTS;User Id={DbUser};Password={DbPassword}";
        }
    }
}
