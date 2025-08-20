// src/components/InputField/InputField.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { InputField,type InputFieldProps } from "./InputField";

const meta: Meta<InputFieldProps> = {
  title: "Components/InputField",
  component: InputField,
  argTypes: {
    onChange: { action: "changed" },
    variant: {
      control: { type: "radio" },
      options: ["filled", "outlined", "ghost"],
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
  },
};
export default meta;
type Story = StoryObj<InputFieldProps>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    helperText: "This will be visible to others",
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    invalid: true,
    errorMessage: "Invalid email format",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    placeholder: "Can't type here",
    disabled: true,
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="space-y-4">
      <InputField {...args} label="Filled" variant="filled" />
      <InputField {...args} label="Outlined" variant="outlined" />
      <InputField {...args} label="Ghost" variant="ghost" />
    </div>
  ),
};
