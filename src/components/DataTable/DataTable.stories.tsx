// src/components/DataTable/DataTable.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable, type DataTableProps } from "./DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const columns: { key: string; title: string; dataIndex: keyof User; sortable: boolean }[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: false },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const data: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 28 },
];

const meta: Meta<DataTableProps<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
  args: {
    data,
    columns,
  },
};
export default meta;
type Story = StoryObj<DataTableProps<User>>;

export const Default: Story = {};

export const Loading: Story = {
  args: { loading: true },
};

export const Empty: Story = {
  args: { data: [] },
};

export const Selectable: Story = {
  args: { selectable: true },
};

export const Sortable: Story = {
  args: { selectable: true },
};
