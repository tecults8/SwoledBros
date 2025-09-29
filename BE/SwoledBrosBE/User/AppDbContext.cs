using Microsoft.EntityFrameworkCore;
using SwoledBrosBE.Models.FitnessApp.Models;


namespace SwoledBrosBE.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<DietPlan> DietPlans { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<MealItem> MealItems { get; set; }
        public DbSet<WorkoutSplit> WorkoutSplits { get; set; }
        public DbSet<WorkoutExercise> WorkoutExercises { get; set; }

       
    }

}
