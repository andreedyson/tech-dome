"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Eye, Search } from "lucide-react";
import React from "react";
import { DataTableFilter } from "../tables/DataTableFilter";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Input } from "./input";
import { Label } from "./label";
import {
  orderStatusFilterOptions,
  productStatusFilterOptions,
} from "@/constants";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  columnFilter?: string;
  filterType?: "product" | "order";
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize,
  columnFilter,
  filterType,
}: DataTableProps<TData, TValue>) {
  const columFiltered = columnFilter || "name";
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: pageSize || 10,
      },
    },
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="relative flex items-center py-4">
          <Label htmlFor="search" className="absolute left-2">
            <Search strokeWidth={3} />
          </Label>
          <Input
            id="search"
            autoComplete="off"
            placeholder={`Search by ${columFiltered == "id" ? "ID" : columFiltered}`}
            value={
              (table.getColumn(columFiltered)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(columFiltered)?.setFilterValue(event.target.value)
            }
            className="max-w-sm border-2 bg-input pl-10 placeholder:capitalize"
          />
        </div>
        <div className="flex items-center gap-3">
          {filterType == "product" && (
            <DataTableFilter
              column={table.getColumn("status")}
              title="Status"
              type="product"
              options={productStatusFilterOptions}
            />
          )}
          {filterType == "order" && (
            <DataTableFilter
              column={table.getColumn("status")}
              title="Status"
              type="product"
              options={orderStatusFilterOptions}
            />
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={"sm"}>
                <Eye />
                Toggle
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  const columnName =
                    column.id.split("_").length > 1
                      ? column.id.split("_")[0] + " " + column.id.split("_")[1]
                      : column.id;
                  return (
                    column.id !== "actions" && (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {columnName}
                      </DropdownMenuCheckboxItem>
                    )
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* Pagination Button */}
        <div className="mx-3 flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
