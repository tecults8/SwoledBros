using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SwoledBrosBE.Models;


namespace SwoledBrosBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ POST: api/User/{userId}/measurements
        [HttpPost("{userId}/measurements")]
        public async Task<IActionResult> AddOrUpdateMeasurements(int userId, [FromBody] UpdateMeasurementsDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
                return NotFound("User not found.");

            // ✅ Update measurements only if provided
            if (dto.Chest.HasValue) user.Chest = dto.Chest;
            if (dto.Waist.HasValue) user.Waist = dto.Waist;
            if (dto.Hips.HasValue) user.Hips = dto.Hips;
            if (dto.Thighs.HasValue) user.Thighs = dto.Thighs;
            if (dto.UpperArms.HasValue) user.UpperArms = dto.UpperArms;
            if (dto.Weight.HasValue) user.Weight = dto.Weight;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Measurements updated successfully." });
        }

        
        [HttpGet("{userId}/measurements")]
        public async Task<IActionResult> GetMeasurements(int userId)
        {
            var user = await _context.Users
                .Where(u => u.Id == userId)
                .Select(u => new
                {
                    u.Chest,
                    u.Waist,
                    u.Hips,
                    u.Thighs,
                    u.UpperArms,
                    u.Weight
                })
                .FirstOrDefaultAsync();

            if (user == null)
                return NotFound("User not found.");

            return Ok(user);
        }

        public class UpdateMeasurementsDto
        {
            public double? Chest { get; set; }
            public double? Waist { get; set; }
            public double? Hips { get; set; }
            public double? Thighs { get; set; }
            public double? UpperArms { get; set; }
            public double? Weight { get; set; }
        }
    }
}
