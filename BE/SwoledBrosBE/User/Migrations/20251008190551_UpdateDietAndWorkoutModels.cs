using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SwoledBrosBE.Models.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDietAndWorkoutModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MealItems_Meals_MealId",
                table: "MealItems");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExercises_WorkoutSplits_WorkoutSplitId",
                table: "WorkoutExercises");

            migrationBuilder.AlterColumn<int>(
                name: "WorkoutSplitId",
                table: "WorkoutExercises",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "MealItems",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MealId",
                table: "MealItems",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FoodName",
                table: "MealItems",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MealItems_Meals_MealId",
                table: "MealItems",
                column: "MealId",
                principalTable: "Meals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExercises_WorkoutSplits_WorkoutSplitId",
                table: "WorkoutExercises",
                column: "WorkoutSplitId",
                principalTable: "WorkoutSplits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MealItems_Meals_MealId",
                table: "MealItems");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExercises_WorkoutSplits_WorkoutSplitId",
                table: "WorkoutExercises");

            migrationBuilder.AlterColumn<int>(
                name: "WorkoutSplitId",
                table: "WorkoutExercises",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "MealItems",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "MealId",
                table: "MealItems",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "FoodName",
                table: "MealItems",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_MealItems_Meals_MealId",
                table: "MealItems",
                column: "MealId",
                principalTable: "Meals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExercises_WorkoutSplits_WorkoutSplitId",
                table: "WorkoutExercises",
                column: "WorkoutSplitId",
                principalTable: "WorkoutSplits",
                principalColumn: "Id");
        }
    }
}
