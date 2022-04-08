using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TripometerAPI.Migrations
{
    public partial class vehicles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Receipts_Trips_TripId",
                table: "Receipts");

            migrationBuilder.AlterColumn<int>(
                name: "TripId",
                table: "Receipts",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Receipts_Trips_TripId",
                table: "Receipts",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Receipts_Trips_TripId",
                table: "Receipts");

            migrationBuilder.AlterColumn<int>(
                name: "TripId",
                table: "Receipts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2022, 4, 8, 15, 44, 40, 390, DateTimeKind.Local).AddTicks(38));

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2022, 4, 8, 15, 44, 40, 390, DateTimeKind.Local).AddTicks(2878));

            migrationBuilder.UpdateData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateTime(2022, 4, 8, 15, 44, 40, 390, DateTimeKind.Local).AddTicks(2924));

            migrationBuilder.UpdateData(
                table: "Trips",
                keyColumn: "Id",
                keyValue: 1,
                column: "EmbarkDate",
                value: new DateTime(2022, 3, 25, 15, 44, 40, 383, DateTimeKind.Local).AddTicks(3783));

            migrationBuilder.UpdateData(
                table: "Trips",
                keyColumn: "Id",
                keyValue: 2,
                column: "EmbarkDate",
                value: new DateTime(2022, 4, 2, 15, 44, 40, 389, DateTimeKind.Local).AddTicks(8620));

            migrationBuilder.AddForeignKey(
                name: "FK_Receipts_Trips_TripId",
                table: "Receipts",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
