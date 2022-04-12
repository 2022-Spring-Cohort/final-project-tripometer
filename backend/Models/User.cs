using Newtonsoft.Json;

namespace TripometerAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        [JsonIgnore]
        public string PasswordHash { get; set; }

    }
}
