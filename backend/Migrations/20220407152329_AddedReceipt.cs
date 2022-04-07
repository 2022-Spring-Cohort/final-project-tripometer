using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TripometerAPI.Migrations
{
    public partial class AddedReceipt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Date", "TripId" },
                values: new object[] { new DateTime(2022, 4, 7, 11, 23, 27, 955, DateTimeKind.Local).AddTicks(986), 2 });

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Date", "TripId" },
                values: new object[] { new DateTime(2022, 4, 7, 11, 23, 27, 965, DateTimeKind.Local).AddTicks(7664), 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Date", "TripId" },
                values: new object[] { new DateTime(2022, 4, 7, 11, 15, 20, 107, DateTimeKind.Local).AddTicks(8402), 1 });

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Date", "TripId" },
                values: new object[] { new DateTime(2022, 4, 7, 11, 15, 20, 113, DateTimeKind.Local).AddTicks(8862), 2 });
        }
    }
}
