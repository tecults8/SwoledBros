using Microsoft.EntityFrameworkCore;


namespace SwoledBrosBE.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Users> Users { get; set; }
        public DbSet<Diet> Diets { get; set; }
        public DbSet<DietPlan> DietPlans { get; set; }
        public DbSet<DietPlanDiet> DietPlanDiets { get; set; }
        public DbSet<UserDietAssignment> UserDietAssignments { get; set; }
        public DbSet<AddResearch> Researches { get; set; }
        public DbSet<BodyMeasurement> BodyMeasurements { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<WorkoutSplit> WorkoutSplits { get; set; }
        public DbSet<SplitWorkout> SplitWorkouts { get; set; }
        public DbSet<UserSplitAssignment> UserSplitAssignments { get; set; }
        public DbSet<WaterIntake> WaterIntakes { get; set; }
        public DbSet<Food> Foods { get; set; }
        public DbSet<StrengthProgress> StrengthProgresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Many-to-many: DietPlan ↔ Diet
            modelBuilder.Entity<DietPlanDiet>()
                .HasKey(dp => new { dp.DietPlanId, dp.DietId });
        }
    }

}
