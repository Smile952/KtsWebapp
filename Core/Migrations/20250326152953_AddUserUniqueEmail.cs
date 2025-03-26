using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    /// <inheritdoc />
    public partial class AddUserUniqueEmail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Username",
                table: "User");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "User",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_User_Email",
                table: "User",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_User_Email",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "User");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "User",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
