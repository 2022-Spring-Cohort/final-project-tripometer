using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TripometerAPI.Migrations
{
    public partial class update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2022, 4, 9, 15, 35, 57, 599, DateTimeKind.Local).AddTicks(4218));

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2022, 4, 9, 15, 35, 57, 599, DateTimeKind.Local).AddTicks(5530));

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateTime(2022, 4, 9, 15, 35, 57, 599, DateTimeKind.Local).AddTicks(5557));

            migrationBuilder.UpdateData(
                table: "Trips",
                keyColumn: "Id",
                keyValue: 1,
                column: "EmbarkDate",
                value: new DateTime(2022, 3, 26, 15, 35, 57, 597, DateTimeKind.Local).AddTicks(2079));

            migrationBuilder.UpdateData(
                table: "Trips",
                keyColumn: "Id",
                keyValue: 2,
                column: "EmbarkDate",
                value: new DateTime(2022, 4, 3, 15, 35, 57, 599, DateTimeKind.Local).AddTicks(3579));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2022, 4, 8, 15, 48, 13, 952, DateTimeKind.Local).AddTicks(8443));

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2022, 4, 8, 15, 48, 13, 953, DateTimeKind.Local).AddTicks(1877));

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateTime(2022, 4, 8, 15, 48, 13, 953, DateTimeKind.Local).AddTicks(1942));

            migrationBuilder.UpdateData(
                table: "Trips",
                keyColumn: "Id",
                keyValue: 1,
                column: "EmbarkDate",
                value: new DateTime(2022, 3, 25, 15, 48, 13, 946, DateTimeKind.Local).AddTicks(9010));

            migrationBuilder.UpdateData(
                table: "Trips",
                keyColumn: "Id",
                keyValue: 2,
                column: "EmbarkDate",
                value: new DateTime(2022, 4, 2, 15, 48, 13, 952, DateTimeKind.Local).AddTicks(6551));
        }
    }
}
