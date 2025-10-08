using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SwoledBrosBE.Models;
using SwoledBrosBE.Models.FitnessApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwoledBrosBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        // ---------------- DTOs ----------------
        public class DietPlanDto
        {
            public List<MealDto> Breakfast { get; set; } = new List<MealDto>();
            public List<MealDto> Lunch { get; set; } = new List<MealDto>();
            public List<MealDto> Dinner { get; set; } = new List<MealDto>();
            public List<MealDto> BrunchSnack { get; set; } = new List<MealDto>();
            public List<MealDto> EveningSnack { get; set; } = new List<MealDto>();
            public List<MealDto> PreBedSnack { get; set; } = new List<MealDto>();
        }

        public class MealDto
        {
            public string FoodName { get; set; } = string.Empty;
            public int Quantity { get; set; }
        }

        public class WorkoutSplitDto
        {
            public string Day { get; set; } = "";
            public List<WorkoutExerciseDto> Exercises { get; set; } = new();
        }

        public class WorkoutExerciseDto
        {
            public string ExerciseName { get; set; } = "";
            public int Sets { get; set; }
            public int Reps { get; set; }
        }

        // ---------------- GET: All users with plans ----------------
        [HttpGet("UsersWithPlans")]
        public async Task<IActionResult> GetUsersWithPlans()
        {
            var users = await _context.Users
                .Include(u => u.DietPlans)
                .Include(u => u.WorkoutSplits)
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    u.Email,
                    DietPlans = u.DietPlans.Select(dp => new { dp.Id, dp.Date }),
                    WorkoutSplits = u.WorkoutSplits.Select(ws => new { ws.Id, ws.Day })
                })
                .ToListAsync();

            return Ok(users);
        }

        // ---------------- POST: Add Diet Plan ----------------
        [HttpPost("AddDietPlan/{userId}")]
        public async Task<IActionResult> AddDietPlan(int userId, [FromBody] DietPlanDto model)
        {
            if (model == null)
                return BadRequest(new { message = "Diet plan data is required." });

            var user = await _context.Users.Include(u => u.DietPlans).FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) return NotFound(new { message = "User not found." });

            var dietPlan = new DietPlan
            {
                UserId = user.Id,
                Date = DateTime.UtcNow,
                Breakfast = new Meal { Items = model.Breakfast.Select(i => new MealItem { FoodName = i.FoodName, Quantity = i.Quantity }).ToList() },
                Lunch = new Meal { Items = model.Lunch.Select(i => new MealItem { FoodName = i.FoodName, Quantity = i.Quantity }).ToList() },
                Dinner = new Meal { Items = model.Dinner.Select(i => new MealItem { FoodName = i.FoodName, Quantity = i.Quantity }).ToList() },
                BrunchSnack = new Meal { Items = model.BrunchSnack.Select(i => new MealItem { FoodName = i.FoodName, Quantity = i.Quantity }).ToList() },
                EveningSnack = new Meal { Items = model.EveningSnack.Select(i => new MealItem { FoodName = i.FoodName, Quantity = i.Quantity }).ToList() },
                PreBedSnack = new Meal { Items = model.PreBedSnack.Select(i => new MealItem { FoodName = i.FoodName, Quantity = i.Quantity }).ToList() }
            };

            _context.DietPlans.Add(dietPlan);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Diet plan added successfully." });
        }

        // ---------------- PUT: Update Diet Plan (partial update) ----------------
        [HttpPut("UpdateDietPlan/{userId}")]
        public async Task<IActionResult> UpdateDietPlan(int userId, [FromBody] DietPlanDto model)
        {
            if (model == null)
                return BadRequest(new { message = "Diet plan data is required." });

            var user = await _context.Users
                .Include(u => u.DietPlans)
                    .ThenInclude(dp => dp.Breakfast)
                .Include(u => u.DietPlans)
                    .ThenInclude(dp => dp.Lunch)
                .Include(u => u.DietPlans)
                    .ThenInclude(dp => dp.Dinner)
                .Include(u => u.DietPlans)
                    .ThenInclude(dp => dp.BrunchSnack)
                .Include(u => u.DietPlans)
                    .ThenInclude(dp => dp.EveningSnack)
                .Include(u => u.DietPlans)
                    .ThenInclude(dp => dp.PreBedSnack)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return NotFound(new { message = "User not found" });

            var latestPlan = user.DietPlans.OrderByDescending(dp => dp.Date).FirstOrDefault();
            if (latestPlan == null) return NotFound(new { message = "No existing diet plan found" });

            if (model.Breakfast?.Any() == true)
                latestPlan.Breakfast.Items = model.Breakfast.Select(i => new MealItem { FoodName = i.FoodName, Quantity = i.Quantity }).ToList();
            if (model.Lunch?.Any() == true)
                latestPlan.Lunch.Items = model.Lunch.Select(i => new MealItem { FoodName = i.FoodName, Quantity = i.Quantity }).ToList();
            if (model.Dinner?.Any() == true)
                latestPlan.Dinner.Items = model.Dinner.Select(i => new MealItem { FoodName = i.FoodName, Quantity = i.Quantity }).ToList();
            if (model.BrunchSnack?.Any() == true)
                latestPlan.BrunchSnack.Items = model.BrunchSnack.Select(i => new MealItem { FoodName = i.FoodName, Quantity = i.Quantity }).ToList();
            if (model.EveningSnack?.Any() == true)
                latestPlan.EveningSnack.Items = model.EveningSnack.Select(i => new MealItem { FoodName = i.FoodName, Quantity = i.Quantity }).ToList();
            if (model.PreBedSnack?.Any() == true)
                latestPlan.PreBedSnack.Items = model.PreBedSnack.Select(i => new MealItem { FoodName = i.FoodName, Quantity = i.Quantity }).ToList();

            await _context.SaveChangesAsync();
            return Ok(new { message = "Diet plan updated successfully." });
        }

        // ---------------- POST: Add Workout Split ----------------
        [HttpPost("AddWorkoutSplit/{userId}")]
        public async Task<IActionResult> AddWorkoutSplit(int userId, [FromBody] WorkoutSplitDto model)
        {
            if (model == null || string.IsNullOrEmpty(model.Day))
                return BadRequest(new { message = "Invalid workout data" });

            var user = await _context.Users
                .Include(u => u.WorkoutSplits)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return NotFound(new { message = "User not found" });

            var workout = new WorkoutSplit
            {
                UserId = user.Id,
                Day = Enum.Parse<DayOfWeek>(model.Day, true),
                Exercises = model.Exercises.Select(e => new WorkoutExercise
                {
                    ExerciseName = e.ExerciseName,
                    Sets = e.Sets,
                    Reps = e.Reps
                }).ToList()
            };

            _context.WorkoutSplits.Add(workout);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Workout split added successfully." });
        }

        // ---------------- GET: Workout for a specific user ----------------
        [HttpGet("Workout/{userId}")]
        public async Task<IActionResult> GetUserWorkout(int userId)
        {
            var user = await _context.Users
                .Include(u => u.WorkoutSplits)
                    .ThenInclude(ws => ws.Exercises)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return NotFound(new { message = "User not found" });

            var result = user.WorkoutSplits
                .GroupBy(ws => ws.Day.ToString().Substring(0, 2))
                .ToDictionary(
                    g => g.Key,
                    g => g.SelectMany(ws => ws.Exercises.Select(e => new
                    {
                        name = e.ExerciseName,
                        setsReps = $"{e.Sets} x {e.Reps}"
                    }))
                );

            return Ok(result);
        }

        // ---------------- GET: Diet Plan for a specific user ----------------
        [HttpGet("DietPlan/{userId}")]
        public async Task<IActionResult> GetUserDietPlan(int userId)
        {
            var user = await _context.Users
                .Include(u => u.DietPlans)
                    .ThenInclude(dp => dp.Breakfast).ThenInclude(m => m.Items)
                .Include(u => u.DietPlans)
                    .ThenInclude(dp => dp.Lunch).ThenInclude(m => m.Items)
                .Include(u => u.DietPlans)
                    .ThenInclude(dp => dp.Dinner).ThenInclude(m => m.Items)
                .Include(u => u.DietPlans)
                    .ThenInclude(dp => dp.BrunchSnack).ThenInclude(m => m.Items)
                .Include(u => u.DietPlans)
                    .ThenInclude(dp => dp.EveningSnack).ThenInclude(m => m.Items)
                .Include(u => u.DietPlans)
                    .ThenInclude(dp => dp.PreBedSnack).ThenInclude(m => m.Items)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return NotFound(new { message = "User not found" });

            var latestPlan = user.DietPlans?.OrderByDescending(dp => dp.Date).FirstOrDefault();
            if (latestPlan == null)
                return Ok(new { message = "No diet plan found" });

            var result = new
            {
                UserId = user.Id,
                Username = user.Username,
                Email = user.Email,
                Date = latestPlan.Date,
                Breakfast = latestPlan.Breakfast?.Items?.Select(i => new { name = i.FoodName, qty = i.Quantity }),
                Lunch = latestPlan.Lunch?.Items?.Select(i => new { name = i.FoodName, qty = i.Quantity }),
                Dinner = latestPlan.Dinner?.Items?.Select(i => new { name = i.FoodName, qty = i.Quantity }),
                BrunchSnack = latestPlan.BrunchSnack?.Items?.Select(i => new { name = i.FoodName, qty = i.Quantity }),
                EveningSnack = latestPlan.EveningSnack?.Items?.Select(i => new { name = i.FoodName, qty = i.Quantity }),
                PreBedSnack = latestPlan.PreBedSnack?.Items?.Select(i => new { name = i.FoodName, qty = i.Quantity })
            };

            return Ok(result);
        }
    }
}
