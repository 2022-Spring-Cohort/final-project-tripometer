using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TripometerAPI.Migrations
{
    public partial class Addedtrip : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2022, 4, 7, 11, 15, 20, 107, DateTimeKind.Local).AddTicks(8402));

            migrationBuilder.InsertData(
                table: "Trips",
                columns: new[] { "Id", "Distance", "ETA", "EndAddress", "EstimatedGasCost", "EstimatedTotalCost", "MileageAfter", "MileageBefore", "OwnerId", "StartAddress", "VehicleId" },
                values: new object[] { 2, 200, 60, "Miami", 5, 1000, 20400, 20000, 1, "Shaker", 1 });

            migrationBuilder.InsertData(
                table: "Receipts",
                columns: new[] { "Id", "AdditionalCosts", "Date", "GasStation", "PricePerGallon", "TotalCost", "TripId" },
                values: new object[] { 2, 1200, new DateTime(2022, 4, 7, 11, 15, 20, 113, DateTimeKind.Local).AddTicks(8862), "Shaker", 5, 800, 2 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Trips",
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
