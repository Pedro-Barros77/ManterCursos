using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ManterCursos_API.Models
{
    public class Course
    {
        [Key]
        public int ID { get; set; }

        [StringLength(50), Required]
        public string Title { get; set; }

        [StringLength(200), Required]
        public string Description { get; set; }

        [Required, DataType(DataType.Date)]
        public DateTime StartingDate { get; set; }

        [Required, DataType(DataType.Date)]
        public DateTime EndingDate { get; set; }

        public int? StudentsPerClass { get; set; }

        [Required, ForeignKey("Category")]
        public int CategoryID { get; set; }
        [JsonIgnore]
        public virtual Category Category { get; set; }
    }
}
