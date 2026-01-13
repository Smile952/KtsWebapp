using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    /// <inheritdoc />
    public partial class addedbotmodifiertouserentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsBot",
                table: "Message");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "User",
                newName: "IsBot");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsBot",
                table: "User",
                newName: "IsActive");

            migrationBuilder.AddColumn<bool>(
                name: "IsBot",
                table: "Message",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
