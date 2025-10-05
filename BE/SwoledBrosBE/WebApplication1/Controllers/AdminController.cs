using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SwoledBrosBE.Models;
using SwoledBrosBE.Models.FitnessApp.Models;

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

        // ---------------- DTOs for Request Mapping ----------------
        public class AddDietPlanDto
        {
            public DietPlanDto DietPlan { get; set; } = new DietPlanDto();
        }

        public class DietPlanDto
        {
            public MealDto Breakfast { get; set; } = new MealDto();
            public MealDto Lunch { get; set; } = new MealDto();
            public MealDto Dinner { get; set; } = new MealDto();
        }

        public class MealDto
        {
            public string FoodName { get; set; } = string.Empty;
            public int Quantity { get; set; }
        }

        //  ---------------- GET: All users with plans ----------------
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
                    DietPlans = u.DietPlans.Select(dp => new
                    {
                        dp.Id,
                        dp.Date
                    }),
                    WorkoutSplits = u.WorkoutSplits.Select(ws => new
                    {
                        ws.Id,
                        ws.Day
                    })
                })
                .ToListAsync();

            return Ok(users);
        }

        // ---------------- POST: Add Diet Plan ----------------
        [HttpPost("AddDietPlan/{userId}")]
        public async Task<IActionResult> AddDietPlan(int userId, [FromBody] AddDietPlanDto model)
        {
            if (model == null || model.DietPlan == null)
                return BadRequest(new { message = "Diet plan data is required." });

            var user = await _context.Users
                .Include(u => u.DietPlans)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return NotFound(new { message = "User not found." });

            
            var dietPlan = new DietPlan
            {
                UserId = user.Id,
                Date = DateTime.UtcNow,
                Breakfast = new Meal
                {
                    Items = new List<MealItem>
                    {
                        new MealItem
                        {
                            FoodName = model.DietPlan.Breakfast.FoodName,
                            Quantity = model.DietPlan.Breakfast.Quantity
                        }
                    }
                },
                Lunch = new Meal
                {
                    Items = new List<MealItem>
                    {
                        new MealItem
                        {
                            FoodName = model.DietPlan.Lunch.FoodName,
                            Quantity = model.DietPlan.Lunch.Quantity
                        }
                    }
                },
                Dinner = new Meal
                {
                    Items = new List<MealItem>
                    {
                        new MealItem
                        {
                            FoodName = model.DietPlan.Dinner.FoodName,
                            Quantity = model.DietPlan.Dinner.Quantity
                        }
                    }
                }
            };

           
            _context.DietPlans.Add(dietPlan);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Diet plan added successfully." });
        }

        [HttpPost("AddWorkoutSplit/{userId}")]
        public async Task<IActionResult> AddWorkoutSplit(int userId, [FromBody] WorkoutSplitDto model)
        {
            if (model == null || string.IsNullOrEmpty(model.Day))
                return BadRequest(new { message = "Invalid workout data" });

            var user = await _context.Users.Include(u => u.WorkoutSplits)
                                           .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return NotFound(new { message = "User not found" });

            var workout = new WorkoutSplit
            {
                UserId = user.Id,
                Day = Enum.Parse<DayOfWeek>(model.Day),
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
    }
}
