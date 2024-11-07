import type { Meta, StoryObj } from "@storybook/react";
import {
  ChipField,
  ReferenceArrayField,
  SingleFieldList,
  TextField,
} from "react-admin";
import React from "react";
import { ResourceContextHelper } from "../../../../utils";
import { attributeName, resourceName } from "../../../../ideExtension";
import {
  adminContextDecorator,
  listDecorator,
  shadowArgsDecorator,
} from "../fieldDecorators";

const recordRepresentationDecorator = (Story: () => React.JSX.Element) => {
  return (
    <ResourceContextHelper
      resources={[
        {
          name: "roles",
          recordRepresentation: "name",
        },
        {
          name: "users",
          recordRepresentation: "name",
        },
      ]}
    >
      <>{Story()}</>
    </ResourceContextHelper>
  );
};

const meta = {
  title: "Fields/ReferenceArrayField",
  component: ReferenceArrayField,
  parameters: {
    layout: "centered",
    controls: {
      exclude: [
        "filter",
        "pagination",
        "perPage",
        "source",
        "reference",
        "queryOptions",
        "sort",
        "sortBy",
      ],
    },
  },
  decorators: [
    listDecorator,
    recordRepresentationDecorator,
    adminContextDecorator,
    shadowArgsDecorator,
  ],
  args: {
    source: "role_ids",
    reference: "users",
  },
  argTypes: {
    source: {
      control: "text",
    },
    reference: {
      control: "text",
    },
    filter: {
      control: "text",
    },
    pagination: {
      control: "text",
    },
    perPage: {
      control: "text",
    },
    queryOptions: {
      control: "text",
    },
    sort: {
      control: "text",
    },
    sortBy: {
      control: "text",
    },
  },
} satisfies Meta<typeof ReferenceArrayField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ source, reference, ...props }) => {
    return (
      <ReferenceArrayField
        source={attributeName("role_ids", {
          resourceSelectTitle: "Parent Resource Name",
          attributeSelectTitle: "Reference Attribute Name",
          resourceId: "resource",
        })}
        reference={resourceName("roles", {
          title: "Child Resource Name",
          allowContext: false,
          resourceId: "referenced_resource",
        })}
        {...props}
      />
    );
  },
};

export const ManualChips: Story = {
  render: ({ source, reference, ...props }) => {
    return (
      <ReferenceArrayField
        source={attributeName("role_ids", {
          resourceSelectTitle: "Parent Resource Name",
          attributeSelectTitle: "Reference Attribute Name",
          resourceId: "resource",
        })}
        reference={resourceName("roles", {
          title: "Child Resource Name",
          allowContext: false,
          resourceId: "referenced_resource",
        })}
        {...props}
      >
        <SingleFieldList>
          <ChipField
            source={attributeName("name", {
              attributeSelectTitle: "Child Resource Representation Attribute",
              resourceId: "referenced_resource",
            })}
          />
        </SingleFieldList>
      </ReferenceArrayField>
    );
  },
};

export const ManualTextField: Story = {
  render: ({ source, reference, ...props }) => {
    return (
      <ReferenceArrayField
        source={attributeName("role_ids", {
          resourceSelectTitle: "Parent Resource Name",
          attributeSelectTitle: "Reference Attribute Name",
          resourceId: "resource",
        })}
        reference={resourceName("roles", {
          title: "Child Resource Name",
          allowContext: false,
          resourceId: "referenced_resource",
        })}
        {...props}
      >
        <SingleFieldList>
          <TextField
            source={attributeName("name", {
              attributeSelectTitle: "Child Resource Representation Attribute",
              resourceId: "referenced_resource",
            })}
          />
        </SingleFieldList>
      </ReferenceArrayField>
    );
  },
};
