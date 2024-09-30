import type { Meta, StoryObj } from "@storybook/react";
import { SelectInput } from "react-admin";
import { inputDecorators } from "../inputDecorators";
import { replaceOnGenerate } from "@amplicode/storybook-extensions";

const meta = {
  title: "Inputs/SelectInput",
  component: SelectInput,
  parameters: {
    // layout: "centered",
    controls: {
      exclude: [
        "source",
        "reference",
        "choices",
        "create",
        "label",
        "createLabel",
        "disableValue",
        "emptyText",
        "emptyValue",
        "isPending",
        "onCreate",
        "optionText",
        "optionValue",
        "resettable",
        "translateChoice",
      ],
    },
  },
  decorators: [...inputDecorators],
  args: {
    source: "city",
  },
  argTypes: {
    choices: {
      control: "object"
    },
    create: {
      control: "text"
    },
    createLabel: {
      control: "text"
    },
    disableValue: {
      control: "text"
    },
    emptyText: {
      control: "text"
    },
    emptyValue: {
      control: "text"
    },
    isPending: {
      control: "boolean"
    },
    onCreate: {
      control: "text"
    },
    optionText: {
      control: "text"
    },
    optionValue: {
      control: "text"
    },
    resettable: {
      control: "boolean"
    },
    translateChoice: {
      control: "boolean"
    },
  }
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ source, ...props }) => {
    const choices: { id: string; name: string }[] = replaceOnGenerate(
      [
        { id: "Moscow", name: "Moscow" },
        { id: "Samara", name: "Samara" },
        { id: "Tokyo", name: "Tokyo" },
      ],
      []
    );

    return <SelectInput source="city" choices={choices} {...props} />;
  },
};

export const Custom: Story = {
  render: ({ source, ...props }) => {
    const choices: { id: string; name: string }[] = replaceOnGenerate(
      [
        { id: "Bill", name: "Bill" },
        { id: "Jack", name: "Jack" },
      ],
      []
    );

    return <SelectInput source="city" choices={choices} {...props} />;
  },
  args: {
    label: "User name",
  },
};
