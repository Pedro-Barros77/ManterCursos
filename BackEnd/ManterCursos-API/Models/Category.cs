using System;
using System.ComponentModel.DataAnnotations;

namespace ManterCursos_API.Models
{
    public class Category
    {
        [Key]
        public int ID { get; set; }

        [StringLength(50, MinimumLength = 3), Required]
        public string Name { get; set; }
    }
}
