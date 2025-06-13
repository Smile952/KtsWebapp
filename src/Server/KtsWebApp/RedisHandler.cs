using StackExchange.Redis;

namespace Interface
{
    public class RedisHandler
    {
        public IDatabase Database { get; set; }
        
        public RedisHandler()
        {
            setDatabaseConnection();
        }

        public void setDatabaseConnection()
        {
            ConfigurationOptions conf = new ConfigurationOptions
            {
                EndPoints = { "localhost:6379" },
                User = "yourUsername",
                Password = "yourPassword"
            };
            ConnectionMultiplexer conn = ConnectionMultiplexer.Connect(conf);

            IDatabase db = conn.GetDatabase();
            Database = db;
        }

        public string GetData(string key)
        {
            try
            {
                string data = Database.StringGet(key);
                return data;
            }
            catch {
                throw new Exception(message: "Redis database is not accessible to read data");
            }
        }

        public string SetData(string key, string value)
        {
            try
            {
                Database.StringSet(key, value);
                return "Data writing was succeffully";
            }
            catch
            {
                throw new Exception(message: "Reddis database is not accessible to write data");
            }
        }

    }
}
