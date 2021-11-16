using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ManterCursos_API.Models
{
    public class Category
    {
        [Key]
        public int ID { get; set; }

        [StringLength(50), Required]
        public string Name { get; set; }

        public virtual ICollection<Course> Cursos { get; set; }
    }
}
