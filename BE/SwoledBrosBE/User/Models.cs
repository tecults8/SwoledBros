using System.ComponentModel.DataAnnotations;

namespace SwoledBrosBE.Models
{
    // ---------------- USER ----------------
    using System;
    using System.Collections.Generic;

    namespace FitnessApp.Models
    {

        public class User
        {
            public int Id { get; set; }

           
            public string Username { get; set; }
            public string Email { get; set; }

           
            public string PasswordHash { get; set; }
            public string PasswordSalt { get; set; }

            // Profile fields (Nullable)
            public double? Height { get; set; }
            public double? Weight { get; set; }

            // Navigation (Nullable)
            public ICollection<DietPlan>? DietPlans { get; set; }
            public ICollection<WorkoutSplit>? WorkoutSplits { get; set; }
        }

        // Daily Diet Plan
        public class DietPlan
        {
            public int Id { get; set; }

            public int UserId { get; set; }
            public User User { get; set; }

            public DateTime? Date { get; set; }

            // Each meal (Nullable)
            public Meal? Breakfast { get; set; }
            public Meal? Lunch { get; set; }
            public Meal? Dinner { get; set; }
            public Meal? BrunchSnack { get; set; }
            public Meal? EveningSnack { get; set; }
            public Meal? PreBedSnack { get; set; }
        }

        // A meal with multiple items
        public class Meal
        {
            public int Id { get; set; }
            public ICollection<MealItem>? Items { get; set; }
        }

        public class MealItem
        {
            public int Id { get; set; }
            public string? FoodName { get; set; }
            public int? Quantity { get; set; }
        }

        // Weekly Workout Split
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
        }
    }
}
