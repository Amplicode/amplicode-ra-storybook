import type { Meta, StoryObj } from "@storybook/react";
import {
  email,
  TextInput,
  useUnique,
} from "react-admin";
import { users } from "../../../../dataProvider";
import { attributeName } from "../../../../ideExtension";
import { Typography } from "@mui/material";
import { AdditionalInfoWrapper, inputDecorators } from "../inputDecorators";

const meta = {
  title: "Inputs/EmailInput",
  component: TextInput,
  parameters: {
    // layout: "centered",
  },
  decorators: [...inputDecorators],
  args: {
    source: "email",
  },
  argTypes: {
    resettable: {
      control: "boolean"
    }
  }
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ source, validate, ...props }) => {
    return (
      <TextInput
        source={attributeName("email")}
        validate={email()}
        {...props}
      />
    );
  },
};

export const UniqueValidation: Story = {
  render: ({ source, validate, ...props }) => {
    const unique = useUnique();

    return (
      <TextInput
        source={attributeName("email")}
        validate={[email(), unique()]}
        {...props}
      />
    );
  },
  decorators: [
    (Story) => {
      return (
        <>
          <AdditionalInfoWrapper>
            <Typography variant="body1">Reserved emails</Typography>
            <div>
              {users.map((user) => {
                return <Typography variant="body2">{user.email}</Typography>;
              })}
            </div>
          </AdditionalInfoWrapper>
          <Story />
        </>
      );
    },
  ],
};
