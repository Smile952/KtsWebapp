using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Core.Migrations
{
    /// <inheritdoc />
    public partial class Addingpermissionstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Permissions",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Public" },
                    { 2, "User" },
                    { 3, "Private" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_PermissionId",
                table: "User",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_PermissionId",
                table: "Employee",
                column: "PermissionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employee_Permissions_PermissionId",
                table: "Employee",
                column: "PermissionId",
                principalTable: "Permissions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Permissions_PermissionId",
                table: "User",
                column: "PermissionId",
                principalTable: "Permissions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employee_Permissions_PermissionId",
                table: "Employee");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Permissions_PermissionId",
                table: "User");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropIndex(
                name: "IX_User_PermissionId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_Employee_PermissionId",
                table: "Employee");
        }
    }
}
