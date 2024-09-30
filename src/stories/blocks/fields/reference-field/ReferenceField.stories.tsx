import type { Meta, StoryObj } from "@storybook/react";
import { ChipField, FunctionField, ReferenceField } from "react-admin";
import React from "react";
import { ResourceContextHelper } from "../../../../utils";
import { attributeName, resourceName } from "../../../../ideExtension";
import {
  listDecorator,
  adminContextDecorator,
  shadowArgsDecorator,
} from "../fieldDecorators";

const resourceContextHeleprDecorator = (Story: () => React.JSX.Element) => {
  return (
    <ResourceContextHelper
      resources={{
        name: "departments",
        recordRepresentation: "name",
      }}
    >
      <>{Story()}</>
    </ResourceContextHelper>
  );
};

const meta = {
  title: "Fields/ReferenceField",
  component: ReferenceField as any,
  parameters: {
    layout: "centered",
    controls: {
      exclude: [
        "source",
        "reference",
        "filter",
        "link",
        "queryOptions",
        "sortBy",
        "label",
        "emptyText"
      ],
    },
  },
  decorators: [
    listDecorator,
    resourceContextHeleprDecorator,
    adminContextDecorator,
    shadowArgsDecorator,
  ],
  args: {
    source: "department_id",
  },
  argTypes: {
    source: {
      control: "text",
    },
    reference: {
      control: "text",
    },
    emptyText: {
      control: "text",
    },
    label: {
      control: "text",
    },
    link: {
      control: "text",
    },
    queryOptions: {
      control: "text",
    },
    sortBy: {
      control: "text",
    },
  },
} satisfies Meta<typeof ReferenceField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DisplayByRecordRepresentation: Story = {
  render: ({ ...props }) => {
    return (
      <ReferenceField
        source={attributeName("department_id", {
          resourceSelectTitle: "Parent Resource Name",
          attributeSelectTitle: "Reference Attribute Name",
        })}
        reference={resourceName("departments", {
          title: "Child Resource Name",
          allowContext: false,
        })}
      />
    );
  },
};

export const DisplayWithCustomField: Story = {
  render: ({ ...props }) => {
    return (
      <ReferenceField
        source={attributeName("department_id", {
          resourceSelectTitle: "Parent Resource Name",
          attributeSelectTitle: "Reference Attribute Name",
        })}
        reference={resourceName("departments", {
          title: "Child Resource Name",
          allowContext: false,
        })}
      >
        <FunctionField
          source="name"
          render={(record) => `${record.name}`.toUpperCase()}
        />
      </ReferenceField>
    );
  },
};

export const ChipReference: Story = {
  render: ({ ...props }) => {
    return (
      <ReferenceField
        source={attributeName("department_id", {
          resourceSelectTitle: "Parent Resource Name",
          attributeSelectTitle: "Reference Attribute Name",
        })}
        reference={resourceName("departments", {
          title: "Referenced Resource Name",
          resourceId: "referenced_resource",
          allowContext: false,
        })}
      >
        <ChipField
          source={attributeName("name", {
            resourceId: "referenced_resource",
            attributeSelectTitle: "Chip Label Attribute Name",
          })}
        />
      </ReferenceField>
    );
  },
};
