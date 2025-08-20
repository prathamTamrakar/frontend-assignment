// src/components/DataTable/DataTable.tsx
import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) {
      setSortConfig({ key, direction: "asc" });
    } else {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const toggleRow = (row: T) => {
    let newSelection: T[];
    if (selectedRows.includes(row)) {
      newSelection = selectedRows.filter((r) => r !== row);
    } else {
      newSelection = [...selectedRows, row];
    }
    setSelectedRows(newSelection);
    onRowSelect?.(newSelection);
  };

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (!data.length) return <p className="p-4 text-center">No data available</p>;

  return (
    <table className="min-w-full border rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          {selectable && <th className="px-4 py-2">Select</th>}
          {columns.map((col) => (
            <th
              key={col.key}
              className="px-4 py-2 cursor-pointer"
              onClick={() => col.sortable && handleSort(col.dataIndex)}
            >
              {col.title}
              {sortConfig?.key === col.dataIndex &&
                (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.id} className="border-t">
            {selectable && (
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => toggleRow(row)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className="px-4 py-2">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
