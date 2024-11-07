import type { Meta, StoryObj } from "@storybook/react";
import { ReferenceManyCount } from "react-admin";
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
  title: "Fields/ReferenceManyCount",
  component: ReferenceManyCount,
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
  argTypes: {
    target: {
      control: "text",
    },
    reference: {
      control: "text",
    },
    resource: {
      control: "text",
    },
    timeout: {
      control: "number",
    },
    filter: {
      control: "text",
    },
    sort: {
      control: "text",
    },
    link: {
      control: "boolean",
    }
  },
  args: {
    label: "Goals count"
  }
} satisfies Meta<typeof ReferenceManyCount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ label, ...props }) => {
    return <ReferenceManyCount {...props} />;
  },
  args: {
    target: attributeName("user_id", {
      resourceSelectTitle: "Field in the related resource",
      attributeSelectTitle: "Field in the related resource",
      resourceId: "resource",
    }),
    reference: resourceName("tasks", {
      title: "Related Resource Name",
      allowContext: false,
      resourceId: "referenced_resource",
    }),
  },
};
