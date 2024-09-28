import {
  useGetList,
  ListBase,
  Datagrid,
  BooleanField,
  DateField,
  EmailField,
  FileField,
  FunctionField,
  NumberField,
  ReferenceArrayField,
  TextField,
  ReferenceField,
} from "react-admin";
import { AdminStoryContext } from "../../../utils";
import { MemoryRouter } from "react-router";
import { useArgs } from "@storybook/preview-api";
import { StoryContext } from "@storybook/react";
import React from "react";

const FIELD_STORIES_MAP: Record<string, () => JSX.Element> = {
  BooleanField: () => {
    return <BooleanField source="active" sortable={false} />;
  },
  DateField: () => {
    return <DateField source="date" sortable={false} />;
  },
  EmailField: () => {
    return <EmailField source="email" sortable={false} />;
  },
  FileField: () => {
    return <FileField source="url" title="Presentation" sortable={false} />;
  },
  FunctionField: () => {
    const createFunctionRender = (record: any) => {
      return <div>Custom render: {record.name}</div>;
    };

    return (
      <FunctionField
        source="name"
        render={createFunctionRender}
        sortable={false}
      />
    );
  },
  NumberField: () => {
    return <NumberField source="day_offs" sortable={false} />;
  },
  ReferenceArrayField: () => {
    return (
      <ReferenceArrayField
        source="role_ids"
        reference="roles"
        sortable={false}
      />
    );
  },
  ReferenceField: () => {
    return (
      <ReferenceField
        source="department_id"
        reference="departments"
        sortable={false}
      />
    );
  },
  TextField: () => {
    return <TextField source="city" sortable={false} />;
  },
};

export const adminContextDecorator = (Story: () => React.JSX.Element) => {
  return (
    <AdminStoryContext>
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    </AdminStoryContext>
  );
};

export const listDecorator = (
  Story: () => React.JSX.Element,
  context: StoryContext
) => {
  const { data } = useGetList("users", {
    sort: { field: "id", order: "ASC" },
  });

  const activeStoryId = context.title.split("/").pop();

  const activeIndex = activeStoryId
    ? Object.keys(FIELD_STORIES_MAP).findIndex(
        (story) => story === activeStoryId
      )
    : undefined;

  return (
    <ListBase resource="users">
      <Datagrid
        sx={
          activeIndex !== undefined
            ? {
                position: "fixed",
                top: "50%",
                left: "50%",
                // 200px width + 32px padding
                transform: `translateX(calc(-232px * ${activeIndex + 0.5})) translateY(-100%)`,
                [`& .MuiTableCell-root`]: {
                  minWidth: 200,
                  maxWidth: 200,
                },
                [`& .RaDatagrid-headerCell:not(.column-${context.args["source"]})`]:
                  {
                    filter: "blur(1.5px)",
                  },
                [`& .RaDatagrid-rowCell:not(.column-${context.args["source"]})`]:
                  {
                    filter: "blur(1.5px)",
                  },
              }
            : {}
        }
        data={data?.slice(0, 2)}
        bulkActionButtons={false}
        sort={{ field: "id", order: "DESC" }}
      >
        {Object.entries(FIELD_STORIES_MAP).map(([id, Component]) => {
          if (context.title.match(id)) {
            return Story();
          }

          return Component();
        })}
      </Datagrid>
    </ListBase>
  );
};

export const shadowArgsDecorator = (Story: () => React.JSX.Element) => {
  const [args, updateArgs, resetArgs] = useArgs();

  if (!("sortable" in args)) {
    updateArgs({ ...args, sortable: false });
  }

  return <Story />;
};

export const fieldDecorators = [
  (Story: () => React.JSX.Element, context: StoryContext) =>
    listDecorator(Story, context),
  (Story: () => React.JSX.Element) => adminContextDecorator(Story),
  (Story: () => React.JSX.Element) => shadowArgsDecorator(Story),
];
