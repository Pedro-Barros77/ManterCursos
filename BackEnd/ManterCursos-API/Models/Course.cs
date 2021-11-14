using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ManterCursos_API.Models
{
    public class Course
    {
        [Key]
        public int ID { get; set; }

        [StringLength(50, MinimumLength = 3), Required]
        public string Title { get; set; }

        [StringLength(100, MinimumLength = 3), Required]
        public string Description { get; set; }

        [Required]
        public DateTime StartingDate { get; set; }

        [Required]
        public DateTime EndingDate { get; set; }

        public int? StudentsPerClass { get; set; }

        [Required, ForeignKey("Category")]
        public int CategoryID { get; set; }
        public Category Category { get; set; }
    }
}
