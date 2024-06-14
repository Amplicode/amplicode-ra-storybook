import type { Meta, StoryObj } from "@storybook/react";
import {
  SelectInput,
} from "react-admin";
import { inputDecorators } from "../inputDecorators";
import { replaceOnGenerate } from "@amplicode/storybook-extensions";

const meta = {
  title: "Inputs/SelectInput",
  component: SelectInput as any,
  parameters: {
    // layout: "centered",
  },
  decorators: [...inputDecorators],
  args: {
    source: "city",
  },
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...props }) => {
    const choices: { id: string; name: string }[] = replaceOnGenerate(
      [
        { id: "Moscow", name: "Moscow" },
        { id: "Samara", name: "Samara" },
        { id: "Tokyo", name: "Tokyo" },
      ],
      [
        /*<ampl:cursor>*/
      ]
    );

    return <SelectInput source="city" choices={choices} {...props} />;
  },
};

export const Custom: Story = {
  render: ({ ...props }) => {
    const choices: { id: string; name: string }[] = replaceOnGenerate(
      [
        { id: "Bill", name: "Bill" },
        { id: "Jack", name: "Jack" },
      ],
      [
        /*<ampl:cursor>*/
      ]
    );

    return <SelectInput source="name" choices={choices} {...props} />;
  },
  args: {
    label: "User name",
  },
};
