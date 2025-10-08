using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SwoledBrosBE.Models.FitnessApp.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required] public string Username { get; set; }
        [Required] public string Email { get; set; }
        [Required] public string PasswordHash { get; set; }
        [Required] public string PasswordSalt { get; set; }

        public double? Height { get; set; }
        public double? Weight { get; set; }

        public ICollection<DietPlan>? DietPlans { get; set; }
        public ICollection<WorkoutSplit>? WorkoutSplits { get; set; }
    }

    public class DietPlan
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public DateTime? Date { get; set; }

        public int? BreakfastId { get; set; }
        public Meal? Breakfast { get; set; }

        public int? LunchId { get; set; }
        public Meal? Lunch { get; set; }

        public int? DinnerId { get; set; }
        public Meal? Dinner { get; set; }

        public int? BrunchSnackId { get; set; }
        public Meal? BrunchSnack { get; set; }

        public int? EveningSnackId { get; set; }
        public Meal? EveningSnack { get; set; }

        public int? PreBedSnackId { get; set; }
        public Meal? PreBedSnack { get; set; }
    }

    public class Meal
    {
        public int Id { get; set; }
        public ICollection<MealItem>? Items { get; set; }
    }

    public class MealItem
    {
        public int Id { get; set; }

        [Required]
        public string FoodName { get; set; }

        public int Quantity { get; set; }

        [ForeignKey("Meal")]
        public int MealId { get; set; }
        public Meal Meal { get; set; }
    }

    public class WorkoutSplit
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public DayOfWeek? Day { get; set; }

        public ICollection<WorkoutExercise>? Exercises { get; set; }
    }

    public class WorkoutExercise
    {
        public int Id { get; set; }
        public string? ExerciseName { get; set; }
        public int? Sets { get; set; }
        public int? Reps { get; set; }

        [ForeignKey("WorkoutSplit")]
        public int WorkoutSplitId { get; set; }
        public WorkoutSplit WorkoutSplit { get; set; }
    }
}
