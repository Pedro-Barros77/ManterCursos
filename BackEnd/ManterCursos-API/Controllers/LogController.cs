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
    public class LogController : Controller
    {
        private readonly ManterCursosContext _context;

        public LogController(ManterCursosContext context)
        {
            _context = context;
        }

        [HttpGet("{CourseID}")]
        public async Task<ActionResult<IEnumerable<CourseLog>>> GetLogs(int CourseID)
        {
            try
            {
                List<CourseLog> logs = await _context.CourseLogs.Where(log => log.CourseID == CourseID).ToListAsync();

                if (logs == null || logs.Count ==0)
                {
                    return NotFound($"Logs não encontrados para o curso de ID informado ({CourseID}).");
                }

                return logs;
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Ocorreu um erro inesperado.", error = ex.Message, stackTrace = ex.StackTrace });
            }
        }


        [HttpPost]
        public async Task<ActionResult> PostLog(CourseLog log)
        {
            try
            {
                _context.CourseLogs.Add(log);
                await _context.SaveChangesAsync();

                return Ok(new { message = $"Log cadastrado com sucesso.", id = log.ID });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Ocorreu um erro inesperado.", error = ex.Message, stackTrace = ex.StackTrace});
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                var log = await _context.CourseLogs.FindAsync(id);
                if (log == null)
                {
                    return NotFound($"Log não encontrada com o ID informado ({id}).");
                }

                _context.CourseLogs.Remove(log);
                await _context.SaveChangesAsync();

                return Ok(new { message = $"Log excluído com sucesso.", id = log.ID });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Ocorreu um erro inesperado.", error = ex.Message, stackTrace = ex.StackTrace });
            }
        }
    }
}
