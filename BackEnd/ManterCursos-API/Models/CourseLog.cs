using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ManterCursos_API.Models
{
    public class CourseLog
    {
        [Key]
        public int ID { get; set; }

        [Required, ForeignKey("User")]
        public int UserID { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }

        [Required, ForeignKey("Course")]
        public int CourseID { get; set; }
        [JsonIgnore]
        public virtual Course Course { get; set; }

        [Required, DataType(DataType.Date)]
        public DateTime EventDate { get; set; }

        [StringLength(200)]
        public string UpdatedFields { get; set; }
    }
}
