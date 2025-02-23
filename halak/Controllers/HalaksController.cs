using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using halak.Models;
using halak.DTOs;

namespace halak.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HalaksController : ControllerBase
    {
        private readonly HalakContext _context;

        public HalaksController(HalakContext context)
        {
            _context = context;
        }

        // GET: api/Halaks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Halak>>> GetHalaks()
        {
            return await _context.Halaks.ToListAsync();
        }

        [HttpGet("Legnagyobb")]
        public async Task<IActionResult> GetLargestHalak()
        {
            var topHalak = await _context.Halaks
                .OrderByDescending(h => h.MeretCm)
                .Take(3)
                .Select(h => new HalDTO
                {
                    Nev = h.Nev,
                    MeretCm = h.MeretCm
                })
                .ToListAsync();

            return Ok(topHalak);
        }

        // GET: api/Halaks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Halak>> GetHalak(int id)
        {
            var halak = await _context.Halaks.FindAsync(id);

            if (halak == null)
            {
                return NotFound();
            }

            return halak;
        }

        // PUT: api/Halaks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHalak(int id, Halak halak)
        {
            if (id != halak.Id)
            {
                return BadRequest();
            }

            _context.Entry(halak).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HalakExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Halaks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Halak>> PostHalak(Halak halak)
        {
            _context.Halaks.Add(halak);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHalak", new { id = halak.Id }, halak);
        }

        // DELETE: api/Halaks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHalak(int id)
        {
            var halak = await _context.Halaks.FindAsync(id);
            if (halak == null)
            {
                return NotFound();
            }

            _context.Halaks.Remove(halak);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HalakExists(int id)
        {
            return _context.Halaks.Any(e => e.Id == id);
        }
    }
}
