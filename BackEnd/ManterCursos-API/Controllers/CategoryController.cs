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
    public class CategoryController : Controller
    {
        private readonly ManterCursosContext _context;

        public CategoryController(ManterCursosContext context)
        {
            _context = context;
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(cat => cat.ID == id);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            try
            {
                return await _context.Categories.ToListAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Ocorreu um erro inesperado.", error = ex.Message, stackTrace = ex.StackTrace});
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            try
            {
                var category = await _context.Categories.FindAsync(id);

                if (category == null)
                {
                    return NotFound($"Categoria não encontrada com o ID informado ({id}).");
                }

                return category;
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Ocorreu um erro inesperado.", error = ex.Message, stackTrace = ex.StackTrace });
            }
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
            try
            {
                if (id != category.ID)
                {
                    return BadRequest("ID do parâmetro diferente do ID da Categoria.");
                }

                if (id <= 0)
                {
                    return BadRequest($"ID informado inválido ({id}), deve ser um valor positivo.");
                }

                if (!CategoryExists(id))
                {
                    return NotFound($"A Categoria de ID informado ({id}) não existe");
                }

                _context.Entry(category).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok($"Categoria de ID '{id}' alterada com sucesso.");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Ocorreu um erro inesperado.", error = ex.Message, stackTrace = ex.StackTrace });
            }
        }

        [HttpPost]
        public async Task<ActionResult> PostCategory(Category category)
        {
            try
            {
                _context.Categories.Add(category);
                await _context.SaveChangesAsync();

                return Ok(new { message = $"Categoria cadastrada com sucesso.", id = category.ID });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Ocorreu um erro inesperado.", error = ex.Message, stackTrace = ex.StackTrace });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                var category = await _context.Categories.FindAsync(id);
                if (category == null)
                {
                    return NotFound($"Categoria não encontrada com o ID informado ({id}).");
                }

                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();

                return Ok(new { message = $"Categoria excluída com sucesso.", id = category.ID });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Ocorreu um erro inesperado.", error = ex.Message, stackTrace = ex.StackTrace });
            }
        }
    }
}
