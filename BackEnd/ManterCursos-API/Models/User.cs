using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ManterCursos_API.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }

        [StringLength(20, MinimumLength = 3), Required]
        public string Login { get; set; }

        [JsonIgnore]
        [StringLength(8, MinimumLength = 8), Required]
        public string Password { get; set; }
    }
}
