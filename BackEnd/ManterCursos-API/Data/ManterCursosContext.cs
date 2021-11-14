using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ManterCursos_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ManterCursos_API.Data
{
    public class ManterCursosContext : DbContext
    {
        public ManterCursosContext(DbContextOptions<ManterCursosContext> options) : base(options) { }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
