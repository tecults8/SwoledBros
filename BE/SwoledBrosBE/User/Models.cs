using System.ComponentModel.DataAnnotations;

namespace SwoledBrosBE.Models
{
    // ---------------- USER ----------------
    public class Users
    {
        [Key]
        public int Id { get; set; }

        public string? Username { get; set; }
        public string? PasswordHash { get; set; }

        public string? Number { get; set; }
        public string? UserType { get; set; }
        public string? Age { get; set; }
        public string? Speciality { get; set; }
        public string? Description { get; set; }

        public ICollection<Diet>? Diets { get; set; }
        public ICollection<DietPlan>? DietPlans { get; set; }
        public ICollection<Workout>? Workouts { get; set; }
    }

    // ---------------- DIET ----------------
    public class Diet
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public virtual Users? User { get; set; }

        public string? Food { get; set; }
        public int? Calories { get; set; }
        public double? Protein { get; set; }
        public double? Fiber { get; set; }
        public double? Carbs { get; set; }
        public double? Fat { get; set; }
        public double? Grams { get; set; } = 100;
    }

    // ---------------- DIET PLAN ----------------
    public class DietPlan
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public virtual Users? User { get; set; }

        public string? Name { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<DietPlanDiet>? DietPlanDiets { get; set; }
    }

    public class DietPlanDiet
    {
        public int? DietPlanId { get; set; }
        public DietPlan? DietPlan { get; set; }

        public int? DietId { get; set; }
        public Diet? Diet { get; set; }
    }

    // ---------------- USER DIET ASSIGNMENT ----------------
    public class UserDietAssignment
    {
        [Key]
        public int Id { get; set; }

        public int? UserId { get; set; }
        public virtual Users? User { get; set; }

        public int? DietPlanId { get; set; }
        public virtual DietPlan? DietPlan { get; set; }

        public int? AssignedById { get; set; }
        public virtual Users? AssignedBy { get; set; }

        public DateTime? AssignedAt { get; set; } = DateTime.UtcNow;
        public bool? IsActive { get; set; } = true;
    }

    // ---------------- RESEARCH ----------------
    public class AddResearch
    {
        [Key]
        public int Id { get; set; }

        public int? UserId { get; set; }
        public virtual Users? User { get; set; }

        public string? Title { get; set; }
        public string? Description { get; set; }
    }

    // ---------------- BODY MEASUREMENT ----------------
    public class BodyMeasurement
    {
        [Key]
        public int Id { get; set; }

        public int? UserId { get; set; }
        public virtual Users? User { get; set; }

        public DateTime? Date { get; set; } = DateTime.UtcNow;
        public decimal? Weight { get; set; }
        public decimal? Waist { get; set; }
        public decimal? Hip { get; set; }
        public decimal? Quads { get; set; }
        public decimal? Arm { get; set; }
        public decimal? Neck { get; set; }
    }

    // ---------------- WORKOUT ----------------
    public class Workout
    {
        [Key]
        public int Id { get; set; }

        public int? UserId { get; set; }
        public virtual Users? User { get; set; }

        public string? Name { get; set; }
        public string? Logo { get; set; }
        public int? Reps { get; set; }
        public int? Sets { get; set; }
        public string? VideoUrl { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    }

    // ---------------- WORKOUT SPLIT ----------------
    public class WorkoutSplit
    {
        [Key]
        public int Id { get; set; }

        public int? UserId { get; set; }
        public virtual Users? User { get; set; }

        public string? Name { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    }

    // ---------------- SPLIT WORKOUT ----------------
    public class SplitWorkout
    {
        [Key]
        public int Id { get; set; }

        public int? UserId { get; set; }
        public virtual Users? User { get; set; }

        public int? WorkoutId { get; set; }
        public virtual Workout? Workout { get; set; }

        public int? SplitId { get; set; }
        public virtual WorkoutSplit? Split { get; set; }

        public string? Day { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    }

    // ---------------- USER SPLIT ASSIGNMENT ----------------
    public class UserSplitAssignment
    {
        [Key]
        public int Id { get; set; }

        public int? UserId { get; set; }
        public virtual Users? User { get; set; }

        public int? SplitId { get; set; }
        public virtual WorkoutSplit? Split { get; set; }

        public int? AssignedById { get; set; }
        public virtual Users? AssignedBy { get; set; }

        public DateTime? AssignedAt { get; set; } = DateTime.UtcNow;
        public bool? IsActive { get; set; } = true;
    }

    // ---------------- WATER INTAKE ----------------
    public class WaterIntake
    {
        [Key]
        public int Id { get; set; }

        public int? UserId { get; set; }
        public virtual Users? User { get; set; }

        public DateTime? Date { get; set; } = DateTime.UtcNow;
        public int? GlassCount { get; set; } = 0;
    }

    // ---------------- FOOD ----------------
    public class Food
    {
        [Key]
        public int Id { get; set; }

        public int? UserId { get; set; }
        public virtual Users? User { get; set; }

        public string? Title { get; set; }
        public string? Ingredients { get; set; }
        public string? Calories { get; set; }
        public string? Description { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    }

    // ---------------- STRENGTH PROGRESS ----------------
    public class StrengthProgress
    {
        [Key]
        public int Id { get; set; }

        public int? UserId { get; set; }
        public virtual Users? User { get; set; }

        public int? WorkoutId { get; set; }
        public virtual Workout? Workout { get; set; }

        public DateTime? Date { get; set; } = DateTime.UtcNow;
        public decimal? Weight { get; set; }
        public int? Reps { get; set; }
    }
}
