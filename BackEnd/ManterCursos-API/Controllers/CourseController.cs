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
                return BadRequest(new { message = "Ocorreu um erro inesperado.", error = ex.Message, stackTrace = ex.StackTrace });
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
        public async Task<IActionResult> PutCourse(int id, Course course)
        {
            try
            {
                int validationResult = ValidateDates(course.StartingDate, course.EndingDate, course.ID);

                switch (validationResult)
                {
                    case 1:
                        return BadRequest(new { message = "A data de início não pode ser anterior à data de hoje.", errorCode = 1 });
                        break;
                    case 2:
                        return BadRequest(new { message = "A data de término não pode ser anterior à data de início.", errorCode = 2 });
                        break;
                    case 3:
                        return BadRequest(new { message = "Existe(m) curso(s) planejado(s) no período informado.", errorCode = 3 });
                        break;
                }

                Course duplicate = CheckDuplicates(course);

                if (duplicate != default)
                {
                    return BadRequest(new { message = "Curso já cadastrado.", errorCode = 4 });
                }



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

                return Ok(new { message = "Curso alterado com sucesso.", id = course.ID });
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
                int validationResult = ValidateDates(course.StartingDate, course.EndingDate, course.ID);

                switch (validationResult)
                {
                    case 1:
                        return BadRequest(new { message = "A data de início não pode ser anterior à data de hoje.", errorCode = 1 });
                        break;
                    case 2:
                        return BadRequest(new { message = "A data de término não pode ser anterior à data de início.", errorCode = 2 });
                        break;
                    case 3:
                        return BadRequest(new { message = "Existe(m) curso(s) planejado(s) no período informado.", errorCode = 3 });
                        break;
                }

                Course duplicate = CheckDuplicates(course);

                if (duplicate != default)
                {
                    return BadRequest(new { message = "Curso já cadastrado.", errorCode = 4 });
                }

                _context.Courses.Add(course);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Curso cadastrado com sucesso.", id = course.ID });
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
                Course course = await _context.Courses.FindAsync(id);

                if(course.EndingDate < DateTime.Now.Date)
                {
                    return BadRequest(new { message = "Não é permitido excluir cursos já realizados!.", errorCode = 5 });
                }



                if (course == null)
                {
                    return NotFound($"Curso não encontrada com o ID informado ({id}).");
                }

                List<CourseLog> courseLogs = await _context.CourseLogs.Where(log => log.CourseID == id).ToListAsync();

                foreach (CourseLog log in courseLogs)
                {
                    _context.CourseLogs.Remove(log);
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




        List<Course> CheckSchedule(DateTime startingDate, DateTime endingDate, int id)
        {
            List<Course> foundCourses = _context.Courses.Where(c =>
                 c.StartingDate <= endingDate
              && c.EndingDate >= startingDate
              && c.ID != id).ToList();

            return foundCourses;
        }

        Course CheckDuplicates(Course course)
        {
            Course duplicatedCourse = _context.Courses.Where(c =>
              (c.Description.ToLower() == course.Description.ToLower()
                || c.Title.ToLower() == course.Title.ToLower())
              && c.ID != course.ID).FirstOrDefault();

            return course;
        }

        int ValidateDates(DateTime starting, DateTime ending, int id)
        {
            DateTime today = DateTime.Now.Date;

            if (starting < today)
            {
                //Inicio anterior a hoje;
                return 1;
            }

            if (ending < starting)
            {
                //Término anterior ao inicio
                return 2;
            }

            List<Course> overlappingCourses = CheckSchedule(starting, ending, id);

            if (overlappingCourses != null && overlappingCourses.Count > 0)
            {
                //Agenda ocupada
                return 3;
            }

            return 0;
        }
    }
}
