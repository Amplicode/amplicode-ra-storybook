import type { Meta, StoryObj } from "@storybook/react";
import {
    Admin,
    BooleanInput,
    Datagrid,
    DateInput,
    EditBase,
    List,
    NumberInput,
    RaRecord,
    ReferenceInput,
    ResourceContextProvider,
    SimpleForm,
    TextField,
    TextInput,
} from "react-admin";
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import React, { useCallback } from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import { AdminStoryContext } from "../../../utils";
import { Drawer, IconButton, SxProps, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CloseIcon from '@mui/icons-material/Close';

const meta = {
    title: "Pages/MasterDetails",
    component: List as any,
    decorators: [(Story) => defaultDecorator(Story)],
    args: {
        perPage: 5,
        exporter: false,
    },
    parameters: {
        docs: {
            canvas: {},
        },
    },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (props) => {
        const location = useLocation();
        const navigate = useNavigate();

        const handleClose = useCallback(() => {
            navigate('/users');
        }, [navigate]);

        const match = matchPath('/users/:id', location.pathname);

        const DetailsView = ({ id }: { id: string}) => {
            return <div style={{ padding: "0px 20px 0px 20px", width: "360px" }}>
                <EditBase id={id}>
                    <Stack direction="row" p={2}>
                        <Typography variant="h6" flex="1">
                            User
                        </Typography>
                        <IconButton onClick={handleClose} size="small">
                            <CloseIcon/>
                        </IconButton>
                    </Stack>
                    <SimpleForm>
                        <TextInput source="name"/>
                        <DateInput source="birthday"/>
                        <BooleanInput source="active"/>
                        <NumberInput source="day_offs"/>
                        <ReferenceInput source="department_id" reference="departments"/>
                    </SimpleForm>
                </EditBase>
            </div>;
        };

        const rowSx = (record: RaRecord): SxProps => {
            let style = {};

            if (!match)
                return style;

            if (match && record.id === parseInt((match as any).params.id)) {
                style = {
                    ...style,
                    backgroundColor: '#f5f5f5',
                };
            }

            return style;
        };

        return (
            <Box display="flex">
                <List
                    sx={{
                        flexGrow: 1,
                        transition: (theme: any) =>
                            theme.transitions.create(['all'], {
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                        marginRight: !!match ? '400px' : 0,
                    }}
                    {...props}>
                    <Datagrid rowClick="edit" rowSx={rowSx}>
                        <TextField source="id"/>
                        <TextField source="name"/>
                    </Datagrid>
                </List>
                <Drawer anchor="right"
                        variant="persistent"
                        sx={{ zIndex: 100 }}
                        open={!!match}
                        onClose={handleClose}>
                    {!!match && <DetailsView id={(match as any).params.id}/>}
                </Drawer>
            </Box>
        );
    },
};

const defaultDecorator = (Story: () => React.JSX.Element) => {
    const Content = () => {
        let resources = [
            {
                name: "departments",
                recordRepresentation: "name",
            },
            {
                name: "users",
                recordRepresentation: "name",
            },
        ];

        return (
            <AdminStoryContext resources={resources}>
                <ResourceContextProvider value="users">
                    <Story/>
                </ResourceContextProvider>
            </AdminStoryContext>
        );
    };

    return (
        <MemoryRouter initialEntries={['/users/1']}>
            <Routes>
                <Route path={'/users/*'} element={<Content/>}/>
            </Routes>
        </MemoryRouter>
    );
};