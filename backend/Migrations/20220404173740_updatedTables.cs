using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TripometerAPI.Migrations
{
    public partial class updatedTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MileageHistories");

            migrationBuilder.AddColumn<int>(
                name: "MileageAfter",
                table: "Trips",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MileageBefore",
                table: "Trips",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2022, 4, 4, 13, 37, 39, 282, DateTimeKind.Local).AddTicks(1907));

            migrationBuilder.UpdateData(
                table: "Trips",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "MileageAfter", "MileageBefore" },
                values: new object[] { 20400, 20000 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MileageAfter",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "MileageBefore",
                table: "Trips");

            migrationBuilder.CreateTable(
                name: "MileageHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Mileage = table.Column<int>(type: "int", nullable: false),
                    VehicleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MileageHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MileageHistories_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "MileageHistories",
                columns: new[] { "Id", "Date", "Mileage", "VehicleId" },
                values: new object[] { 1, new DateTime(2022, 3, 31, 9, 48, 45, 348, DateTimeKind.Local).AddTicks(5652), 0, 1 });

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2022, 3, 31, 9, 48, 45, 352, DateTimeKind.Local).AddTicks(4531));

            migrationBuilder.CreateIndex(
                name: "IX_MileageHistories_VehicleId",
                table: "MileageHistories",
                column: "VehicleId");
        }
    }
}
