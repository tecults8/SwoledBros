using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace SwoledBrosBE.Models.Migrations
{
    /// <inheritdoc />
    public partial class modelRedesign : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DietPlans_Users_UserId",
                table: "DietPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSplits_Users_UserId",
                table: "WorkoutSplits");

            migrationBuilder.DropTable(
                name: "BodyMeasurements");

            migrationBuilder.DropTable(
                name: "DietPlanDiets");

            migrationBuilder.DropTable(
                name: "Foods");

            migrationBuilder.DropTable(
                name: "Researches");

            migrationBuilder.DropTable(
                name: "SplitWorkouts");

            migrationBuilder.DropTable(
                name: "StrengthProgresses");

            migrationBuilder.DropTable(
                name: "UserDietAssignments");

            migrationBuilder.DropTable(
                name: "UserSplitAssignments");

            migrationBuilder.DropTable(
                name: "WaterIntakes");

            migrationBuilder.DropTable(
                name: "Diets");

            migrationBuilder.DropTable(
                name: "Workouts");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "WorkoutSplits");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "WorkoutSplits");

            migrationBuilder.DropColumn(
                name: "Age",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Number",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Speciality",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserType",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "DietPlans");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "DietPlans",
                newName: "Date");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "WorkoutSplits",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Day",
                table: "WorkoutSplits",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Height",
                table: "Users",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordSalt",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Weight",
                table: "Users",
                type: "double precision",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "DietPlans",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BreakfastId",
                table: "DietPlans",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BrunchSnackId",
                table: "DietPlans",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DinnerId",
                table: "DietPlans",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EveningSnackId",
                table: "DietPlans",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LunchId",
                table: "DietPlans",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PreBedSnackId",
                table: "DietPlans",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Meals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meals", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkoutExercises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ExerciseName = table.Column<string>(type: "text", nullable: true),
                    Sets = table.Column<int>(type: "integer", nullable: true),
                    Reps = table.Column<int>(type: "integer", nullable: true),
                    WorkoutSplitId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkoutExercises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkoutExercises_WorkoutSplits_WorkoutSplitId",
                        column: x => x.WorkoutSplitId,
                        principalTable: "WorkoutSplits",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MealItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FoodName = table.Column<string>(type: "text", nullable: true),
                    Quantity = table.Column<int>(type: "integer", nullable: true),
                    MealId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MealItems_Meals_MealId",
                        column: x => x.MealId,
                        principalTable: "Meals",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_DietPlans_BreakfastId",
                table: "DietPlans",
                column: "BreakfastId");

            migrationBuilder.CreateIndex(
                name: "IX_DietPlans_BrunchSnackId",
                table: "DietPlans",
                column: "BrunchSnackId");

            migrationBuilder.CreateIndex(
                name: "IX_DietPlans_DinnerId",
                table: "DietPlans",
                column: "DinnerId");

            migrationBuilder.CreateIndex(
                name: "IX_DietPlans_EveningSnackId",
                table: "DietPlans",
                column: "EveningSnackId");

            migrationBuilder.CreateIndex(
                name: "IX_DietPlans_LunchId",
                table: "DietPlans",
                column: "LunchId");

            migrationBuilder.CreateIndex(
                name: "IX_DietPlans_PreBedSnackId",
                table: "DietPlans",
                column: "PreBedSnackId");

            migrationBuilder.CreateIndex(
                name: "IX_MealItems_MealId",
                table: "MealItems",
                column: "MealId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutExercises_WorkoutSplitId",
                table: "WorkoutExercises",
                column: "WorkoutSplitId");

            migrationBuilder.AddForeignKey(
                name: "FK_DietPlans_Meals_BreakfastId",
                table: "DietPlans",
                column: "BreakfastId",
                principalTable: "Meals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DietPlans_Meals_BrunchSnackId",
                table: "DietPlans",
                column: "BrunchSnackId",
                principalTable: "Meals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DietPlans_Meals_DinnerId",
                table: "DietPlans",
                column: "DinnerId",
                principalTable: "Meals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DietPlans_Meals_EveningSnackId",
                table: "DietPlans",
                column: "EveningSnackId",
                principalTable: "Meals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DietPlans_Meals_LunchId",
                table: "DietPlans",
                column: "LunchId",
                principalTable: "Meals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DietPlans_Meals_PreBedSnackId",
                table: "DietPlans",
                column: "PreBedSnackId",
                principalTable: "Meals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DietPlans_Users_UserId",
                table: "DietPlans",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSplits_Users_UserId",
                table: "WorkoutSplits",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DietPlans_Meals_BreakfastId",
                table: "DietPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_DietPlans_Meals_BrunchSnackId",
                table: "DietPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_DietPlans_Meals_DinnerId",
                table: "DietPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_DietPlans_Meals_EveningSnackId",
                table: "DietPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_DietPlans_Meals_LunchId",
                table: "DietPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_DietPlans_Meals_PreBedSnackId",
                table: "DietPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_DietPlans_Users_UserId",
                table: "DietPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSplits_Users_UserId",
                table: "WorkoutSplits");

            migrationBuilder.DropTable(
                name: "MealItems");

            migrationBuilder.DropTable(
                name: "WorkoutExercises");

            migrationBuilder.DropTable(
                name: "Meals");

            migrationBuilder.DropIndex(
                name: "IX_DietPlans_BreakfastId",
                table: "DietPlans");

            migrationBuilder.DropIndex(
                name: "IX_DietPlans_BrunchSnackId",
                table: "DietPlans");

            migrationBuilder.DropIndex(
                name: "IX_DietPlans_DinnerId",
                table: "DietPlans");

            migrationBuilder.DropIndex(
                name: "IX_DietPlans_EveningSnackId",
                table: "DietPlans");

            migrationBuilder.DropIndex(
                name: "IX_DietPlans_LunchId",
                table: "DietPlans");

            migrationBuilder.DropIndex(
                name: "IX_DietPlans_PreBedSnackId",
                table: "DietPlans");

            migrationBuilder.DropColumn(
                name: "Day",
                table: "WorkoutSplits");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BreakfastId",
                table: "DietPlans");

            migrationBuilder.DropColumn(
                name: "BrunchSnackId",
                table: "DietPlans");

            migrationBuilder.DropColumn(
                name: "DinnerId",
                table: "DietPlans");

            migrationBuilder.DropColumn(
                name: "EveningSnackId",
                table: "DietPlans");

            migrationBuilder.DropColumn(
                name: "LunchId",
                table: "DietPlans");

            migrationBuilder.DropColumn(
                name: "PreBedSnackId",
                table: "DietPlans");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "DietPlans",
                newName: "CreatedAt");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "WorkoutSplits",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "WorkoutSplits",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "WorkoutSplits",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Users",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "Users",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "Age",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Number",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Speciality",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserType",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "DietPlans",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "DietPlans",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BodyMeasurements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    Arm = table.Column<decimal>(type: "numeric", nullable: true),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Hip = table.Column<decimal>(type: "numeric", nullable: true),
                    Neck = table.Column<decimal>(type: "numeric", nullable: true),
                    Quads = table.Column<decimal>(type: "numeric", nullable: true),
                    Waist = table.Column<decimal>(type: "numeric", nullable: true),
                    Weight = table.Column<decimal>(type: "numeric", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BodyMeasurements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BodyMeasurements_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Diets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    Calories = table.Column<int>(type: "integer", nullable: true),
                    Carbs = table.Column<double>(type: "double precision", nullable: true),
                    Fat = table.Column<double>(type: "double precision", nullable: true),
                    Fiber = table.Column<double>(type: "double precision", nullable: true),
                    Food = table.Column<string>(type: "text", nullable: true),
                    Grams = table.Column<double>(type: "double precision", nullable: true),
                    Protein = table.Column<double>(type: "double precision", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Diets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Diets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Foods",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    Calories = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Ingredients = table.Column<string>(type: "text", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Foods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Foods_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Researches",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Researches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Researches_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserDietAssignments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AssignedById = table.Column<int>(type: "integer", nullable: true),
                    DietPlanId = table.Column<int>(type: "integer", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    AssignedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDietAssignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserDietAssignments_DietPlans_DietPlanId",
                        column: x => x.DietPlanId,
                        principalTable: "DietPlans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserDietAssignments_Users_AssignedById",
                        column: x => x.AssignedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserDietAssignments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserSplitAssignments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AssignedById = table.Column<int>(type: "integer", nullable: true),
                    SplitId = table.Column<int>(type: "integer", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    AssignedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSplitAssignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSplitAssignments_Users_AssignedById",
                        column: x => x.AssignedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserSplitAssignments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserSplitAssignments_WorkoutSplits_SplitId",
                        column: x => x.SplitId,
                        principalTable: "WorkoutSplits",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WaterIntakes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    GlassCount = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WaterIntakes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WaterIntakes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Workouts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Logo = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Reps = table.Column<int>(type: "integer", nullable: true),
                    Sets = table.Column<int>(type: "integer", nullable: true),
                    VideoUrl = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workouts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Workouts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DietPlanDiets",
                columns: table => new
                {
                    DietPlanId = table.Column<int>(type: "integer", nullable: false),
                    DietId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DietPlanDiets", x => new { x.DietPlanId, x.DietId });
                    table.ForeignKey(
                        name: "FK_DietPlanDiets_DietPlans_DietPlanId",
                        column: x => x.DietPlanId,
                        principalTable: "DietPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DietPlanDiets_Diets_DietId",
                        column: x => x.DietId,
                        principalTable: "Diets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SplitWorkouts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SplitId = table.Column<int>(type: "integer", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    WorkoutId = table.Column<int>(type: "integer", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Day = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SplitWorkouts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SplitWorkouts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SplitWorkouts_WorkoutSplits_SplitId",
                        column: x => x.SplitId,
                        principalTable: "WorkoutSplits",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SplitWorkouts_Workouts_WorkoutId",
                        column: x => x.WorkoutId,
                        principalTable: "Workouts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "StrengthProgresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    WorkoutId = table.Column<int>(type: "integer", nullable: true),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Reps = table.Column<int>(type: "integer", nullable: true),
                    Weight = table.Column<decimal>(type: "numeric", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StrengthProgresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StrengthProgresses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_StrengthProgresses_Workouts_WorkoutId",
                        column: x => x.WorkoutId,
                        principalTable: "Workouts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BodyMeasurements_UserId",
                table: "BodyMeasurements",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DietPlanDiets_DietId",
                table: "DietPlanDiets",
                column: "DietId");

            migrationBuilder.CreateIndex(
                name: "IX_Diets_UserId",
                table: "Diets",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Foods_UserId",
                table: "Foods",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Researches_UserId",
                table: "Researches",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SplitWorkouts_SplitId",
                table: "SplitWorkouts",
                column: "SplitId");

            migrationBuilder.CreateIndex(
                name: "IX_SplitWorkouts_UserId",
                table: "SplitWorkouts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SplitWorkouts_WorkoutId",
                table: "SplitWorkouts",
                column: "WorkoutId");

            migrationBuilder.CreateIndex(
                name: "IX_StrengthProgresses_UserId",
                table: "StrengthProgresses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_StrengthProgresses_WorkoutId",
                table: "StrengthProgresses",
                column: "WorkoutId");

            migrationBuilder.CreateIndex(
                name: "IX_UserDietAssignments_AssignedById",
                table: "UserDietAssignments",
                column: "AssignedById");

            migrationBuilder.CreateIndex(
                name: "IX_UserDietAssignments_DietPlanId",
                table: "UserDietAssignments",
                column: "DietPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_UserDietAssignments_UserId",
                table: "UserDietAssignments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSplitAssignments_AssignedById",
                table: "UserSplitAssignments",
                column: "AssignedById");

            migrationBuilder.CreateIndex(
                name: "IX_UserSplitAssignments_SplitId",
                table: "UserSplitAssignments",
                column: "SplitId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSplitAssignments_UserId",
                table: "UserSplitAssignments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WaterIntakes_UserId",
                table: "WaterIntakes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Workouts_UserId",
                table: "Workouts",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_DietPlans_Users_UserId",
                table: "DietPlans",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSplits_Users_UserId",
                table: "WorkoutSplits",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
