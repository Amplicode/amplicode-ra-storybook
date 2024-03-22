import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "@mui/material";
import { AdminContext, DateInput, defaultI18nProvider, maxValue, minValue, NumberInput, SimpleForm } from "react-admin";
import { dataProvider } from "../../../../dataProvider";
import { attributeName } from "../../../../ideExtension";
import dayjs from "dayjs";

const contextDecorator = (Story: () => React.JSX.Element) => {
    return (
        <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider}>
            <SimpleForm mode="onChange" toolbar={false}>
                <Story />
            </SimpleForm>
        </AdminContext>
    );
};

const meta = {
    title: "Blocks/Inputs/DateInput",
    component: DateInput as any,
    parameters: {
        layout: "centered",
        controls: {
            exclude: ['source']
        },
    },
    decorators: [
        contextDecorator
    ],
    args: {
        source: "",
    }
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: ({ source }) => {
        return (
            <DateInput
                source={source}
            />
        );
    },
};

export const FutureDate: Story = {
    render: () => {
        const minDate = (date = dayjs().add(1, "day").format("YYYY-MM-DD"), message = 'Must be in the future') => {
            return minValue(date, message);
        };

        const validatePeriod = [minDate()];

        return (
            <DateInput
                source={attributeName("date")}
                validate={validatePeriod}
            />
        );
    },
    decorators: [
        (Story) => {
            return (
                <div>
                    <Typography variant="body2">Valid period starts tomorrow ({dayjs().add(1, "day").format("YYYY-MM-DD")})</Typography>
                    <Typography variant="body2">Validation mode "onChange"</Typography>
                    <Story />
                </div>
            )
        }
    ]
};

export const PeriodValidation: Story = {
    render: () => {
        const minDate = (date = dayjs('1970-01-01').format("YYYY-MM-DD"), message = `Must be at least ${date}`) => {
            return minValue(date, message);
        };
        const maxDate = (date = dayjs('2030-12-31').format("YYYY-MM-DD"), message = `Must be ${date} or less`) => {
            return maxValue(date, message);
        };

        const validatePeriod = [minDate(), maxDate()];

        return (
            <DateInput
                source={attributeName("date")}
                validate={validatePeriod}
            />
        );
    },
    decorators: [
        (Story) => {
            return (
                <div>
                    <Typography variant="body2">Valid period from 1970/01/01 to 2030/12/31</Typography>
                    <Typography variant="body2">Validation mode "onChange"</Typography>
                    <Story />
                </div>
            )
        }
    ]
};

export const ExcludeDaysValidation: Story = {
    render: () => {
        const excludeWeekends = (value: string) => {
            const day = dayjs(value).day();

            if ([6, 0].includes(day)) {
                return "You selected a weekend"
            }

            return undefined;
        };

        const validateWeekends = [excludeWeekends];

        return (
            <DateInput
                source={attributeName("date")}
                validate={validateWeekends}
            />
        );
    },
    decorators: [
        (Story) => {
            return (
                <div>
                    <Typography variant="body2">Saturdays and Sundays are not valid</Typography>
                    <Typography variant="body2">Validation mode "onChange"</Typography>
                    <Story />
                </div>
            )
        }
    ]
};
