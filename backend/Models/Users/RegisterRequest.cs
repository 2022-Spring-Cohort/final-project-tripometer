using System.ComponentModel.DataAnnotations;

namespace TripometerAPI.Models.Users
{
    public class RegisterRequest
    {

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}