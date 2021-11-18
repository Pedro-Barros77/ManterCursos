using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ManterCursos_API.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }

        [StringLength(50), Required]
        public string Name { get; set; }

        [StringLength(20), Required]
        public string Login { get; set; }
        [StringLength(8, MinimumLength = 8), Required]
        public string Password { get; set; }
    }
}
