// src/App.tsx
import { InputField } from "./components/InputField/InputField";
import { DataTable, type Column } from "./components/DataTable/DataTable";
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  const users = [
    { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
    { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  ];

  const columns: Column<{ id: number; name: string; email: string; age: number; }>[] = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "email", title: "Email", dataIndex: "email" },
    { key: "age", title: "Age", dataIndex: "age", sortable: true },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Demo</h1>
      <InputField label="Username" placeholder="Enter username" helperText="Helper text" />
      <DataTable data={users} columns={columns} selectable />
      <Analytics/>
    </div>
  );
}
