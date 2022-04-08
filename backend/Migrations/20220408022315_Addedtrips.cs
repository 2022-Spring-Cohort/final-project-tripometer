using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TripometerAPI.Migrations
{
    public partial class Addedtrips : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2022, 4, 7, 22, 23, 15, 289, DateTimeKind.Local).AddTicks(809));

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2022, 4, 7, 22, 23, 15, 291, DateTimeKind.Local).AddTicks(7381));

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateTime(2022, 4, 7, 22, 23, 15, 291, DateTimeKind.Local).AddTicks(7434));

            migrationBuilder.InsertData(
                table: "Trips",
                columns: new[] { "Id", "Distance", "ETA", "EndAddress", "EstimatedGasCost", "EstimatedTotalCost", "MileageAfter", "MileageBefore", "OwnerId", "StartAddress", "VehicleId" },
                values: new object[,]
                {
                    { 6, 200, 60, "Cincinnati", 5, 1000, 20400, 20000, 1, "Cleveland", 1 },
                    { 7, 200, 60, "Columbus", 5, 1000, 20400, 20000, 1, "Chicago", 1 },
                    { 8, 200, 60, "Miami", 5, 1000, 20400, 20000, 1, "Shaker", 2 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Trips",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Trips",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Trips",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2022, 4, 7, 22, 19, 42, 9, DateTimeKind.Local).AddTicks(8199));

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2022, 4, 7, 22, 19, 42, 11, DateTimeKind.Local).AddTicks(9768));

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateTime(2022, 4, 7, 22, 19, 42, 11, DateTimeKind.Local).AddTicks(9821));
        }
    }
}
