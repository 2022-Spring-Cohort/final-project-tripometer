using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TripometerAPI.Migrations
{
    public partial class AddVehicles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2022, 4, 6, 12, 55, 16, 403, DateTimeKind.Local).AddTicks(8608));

            migrationBuilder.InsertData(
                table: "Vehicles",
                columns: new[] { "Id", "FuelEfficiency", "FuelTank", "Make", "Model", "OwnerId", "Year" },
                values: new object[] { 2, 100, 200f, "Model Y", "Tesla", 1, 2020 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2022, 4, 5, 11, 24, 40, 301, DateTimeKind.Local).AddTicks(7533));
        }
    }
}
