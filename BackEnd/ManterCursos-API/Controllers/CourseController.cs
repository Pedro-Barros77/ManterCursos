using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ManterCursos_API.Data;
using ManterCursos_API.Models;

namespace ManterCursos_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : Controller
    {
        private readonly ManterCursosContext _context;

        public CourseController(ManterCursosContext context)
        {
            _context = context;
        }

        private bool CourseExists(int id)
        {
            return _context.Courses.Any(c => c.ID == id);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            try
            {
                return await _context.Courses.ToListAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Ocorreu um erro inesperado.", error = ex.Message, stackTrace = ex.StackTrace});
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            try
            {
                var course = await _context.Courses.FindAsync(id);

                if (course == null)
                {
                    return NotFound($"Curso não encontrada com o ID informado ({id}).");
                }

                return course;
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Ocorreu um erro inesperado.", error = ex.Message, stackTrace = ex.StackTrace });
            }
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse(int id, Category course)
        {
            try
            {
                if (id != course.ID)
                {
                    return BadRequest("ID do parâmetro diferente do ID do Curso.");
                }

                if (id <= 0)
                {
                    return BadRequest($"ID informado inválido ({id}), deve ser um valor positivo.");
                }

                if (!CourseExists(id))
                {
                    return NotFound($"O Curso de ID informado ({id}) não existe");
                }

                _context.Entry(course).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok($"Curso de ID '{id}' alterado com sucesso.");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Ocorreu um erro inesperado.", error = ex.Message, stackTrace = ex.StackTrace });
            }
        }

        [HttpPost]
        public async Task<ActionResult> PostCourse(Course course)
        {
            try
            {
                _context.Courses.Add(course);
                await _context.SaveChangesAsync();

                return Ok(new { message = $"Curso cadastrado com sucesso.", id = course.ID });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Ocorreu um erro inesperado.", error = ex.Message, stackTrace = ex.StackTrace });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            try
            {
                var course = await _context.Courses.FindAsync(id);
                if (course == null)
                {
                    return NotFound($"Curso não encontrada com o ID informado ({id}).");
                }

                _context.Courses.Remove(course);
                await _context.SaveChangesAsync();

                return Ok(new { message = $"Curso excluído com sucesso.", id = course.ID });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Ocorreu um erro inesperado.", error = ex.Message, stackTrace = ex.StackTrace });
            }
        }
    }
}
