import type { Meta, StoryObj } from "@storybook/react";
import {
  AutocompleteInput,
  ReferenceInput,
  required,
  SimpleForm,
  useRecordContext,
} from "react-admin";
import { ResourceContextHelper } from "../../../../utils";
import { attributeName, resourceName } from "../../../../ideExtension";
import { replaceOnGenerate, topLevel } from "@amplicode/storybook-extensions";
import { useFormContext } from "react-hook-form";
import React, { useEffect } from "react";
import {
  adminContextDecorator,
  listDecorator,
  shadowArgsDecorator,
} from "../inputDecorators";

const resourceContextHeleprDecorator = (Story: () => React.JSX.Element) => {
  return (
    <ResourceContextHelper
      resources={[
        {
          name: "departments",
          recordRepresentation: "name",
        },
        {
          name: "users",
          recordRepresentation: "name",
        },
        {
          name: "tasks",
          recordRepresentation: "name",
        },
      ]}
    >
      <>{Story()}</>
    </ResourceContextHelper>
  );
};

const meta = {
  title: "Inputs/ReferenceInput",
  component: ReferenceInput as any,
  parameters: {
    // layout: "centered",
  },
  decorators: [
    listDecorator,
    resourceContextHeleprDecorator,
    adminContextDecorator,
    shadowArgsDecorator,
  ],
  args: {
    source: "department_id",
    reference: "departments",
  },
} satisfies Meta<typeof ReferenceInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...props }) => {
    return (
      <ReferenceInput
        source={attributeName("department_id", {
          resourceSelectTitle: "Source Resource Name",
          attributeSelectTitle: "Reference Id Attribute",
        })}
        reference={resourceName("departments", {
          title: "Referenced Resource",
          allowContext: false,
        })}
        {...props}
      />
    );
  },
};

export const Readonly: Story = {
  render: ({ ...props }) => {
    return (
      <ReferenceInput
        source={attributeName("department_id", {
          resourceSelectTitle: "Source Resource Name",
          attributeSelectTitle: "Reference Id Attribute",
        })}
        reference={resourceName("departments", {
          title: "Referenced Resource",
          allowContext: false,
        })}
        {...props}
      >
        <AutocompleteInput readOnly />
      </ReferenceInput>
    );
  },
};

export const Validated: Story = {
  render: ({ ...props }) => {
    return (
      <ReferenceInput
        source={attributeName("department_id", {
          resourceSelectTitle: "Source Resource Name",
          attributeSelectTitle: "Reference Id Attribute",
        })}
        reference={resourceName("departments", {
          title: "Referenced Resource",
          allowContext: false,
        })}
        {...props}
      >
        <AutocompleteInput validate={required()} />
      </ReferenceInput>
    );
  },
};

export const ReadonlyForPredefinedValue: Story = {
  name: "Readonly for predefined attribute",
  render: ({ subresourceName, subresourceBackReference }) => {
    const ReadonlyReferenceInput = topLevel(() => {
      const record = useRecordContext();
      const readOnly =
        record != null &&
        subresourceBackReference in record &&
        record[subresourceBackReference] != null;

      return (
        <ReferenceInput
          source={subresourceBackReference}
          reference={subresourceName}
        >
          <AutocompleteInput readOnly={readOnly} />
        </ReferenceInput>
      );
    });

    return <ReadonlyReferenceInput />;
  },

  args: {
    subresourceName: resourceName("departments", {
      title: "Child Resource",
      resourceId: "subresource",
      allowContext: false,
    }),
    subresourceBackReference: attributeName("department_id", {
      resourceId: "resource",
      attributeSelectTitle: "Child Resource Reference Attribute",
    }),
  },
};

export const FiltrationByParentField: Story = {
  render: ({ parentId, attributeId }) => {
    const DependentInput = topLevel(() => {
      const { watch, resetField } = useFormContext();
      const parentIdValue = watch(parentId, null);

      const filter = parentIdValue
        ? replaceOnGenerate(
            { user_id: parentIdValue },
            { parentId: parentIdValue }
          )
        : {};

      useEffect(() => {
        resetField(attributeId);
      }, [parentIdValue, resetField]);

      return (
        <ReferenceInput
          source={attributeId}
          reference="tasks"
          filter={filter}
        />
      );
    });

    return <DependentInput />;
  },
  args: {
    parentId: replaceOnGenerate("user_id", "parentId"),
    attributeId: replaceOnGenerate("task_id", "childId"),
  },
  decorators: [
    (Story) => {
      return (
        <SimpleForm
          // onSubmit={(data) => {
          //   alert("Task id: " + data.task_id);
          // }}
          toolbar={false}
        >
          <ReferenceInput source="user_id" reference="users" />
          <Story />
        </SimpleForm>
      );
    },
  ],
};
