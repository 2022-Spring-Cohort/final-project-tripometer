using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TripometerAPI.Migrations
{
    public partial class AddedSeeddata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Trips",
                newName: "EmbarkDate");

            migrationBuilder.AddColumn<DateTime>(
                name: "DisembarkDate",
                table: "Trips",
                type: "datetime2",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2022, 4, 8, 11, 45, 18, 738, DateTimeKind.Local).AddTicks(9334));

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2022, 4, 8, 11, 45, 18, 739, DateTimeKind.Local).AddTicks(595));

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateTime(2022, 4, 8, 11, 45, 18, 739, DateTimeKind.Local).AddTicks(624));

            migrationBuilder.UpdateData(
                table: "Trips",
                keyColumn: "Id",
                keyValue: 1,
                column: "EmbarkDate",
                value: new DateTime(2022, 3, 25, 11, 45, 18, 736, DateTimeKind.Local).AddTicks(4467));

            migrationBuilder.UpdateData(
                table: "Trips",
                keyColumn: "Id",
                keyValue: 2,
                column: "EmbarkDate",
                value: new DateTime(2022, 4, 2, 11, 45, 18, 738, DateTimeKind.Local).AddTicks(8558));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisembarkDate",
                table: "Trips");

            migrationBuilder.RenameColumn(
                name: "EmbarkDate",
                table: "Trips",
                newName: "Date");

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2022, 4, 8, 11, 31, 58, 518, DateTimeKind.Local).AddTicks(6549));

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2022, 4, 8, 11, 31, 58, 518, DateTimeKind.Local).AddTicks(7715));

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateTime(2022, 4, 8, 11, 31, 58, 518, DateTimeKind.Local).AddTicks(7742));

            migrationBuilder.UpdateData(
                table: "Trips",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2022, 4, 8, 11, 31, 58, 515, DateTimeKind.Local).AddTicks(9838));

            migrationBuilder.UpdateData(
                table: "Trips",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2022, 4, 8, 11, 31, 58, 518, DateTimeKind.Local).AddTicks(5829));
        }
    }
}
