import type { Meta, StoryObj } from "@storybook/react";
import { Box, Button, Input, Paper, Stack, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import { GenerationInstructions } from "@amplicode/storybook-extensions";
import { useCreatePath } from "react-admin";
import { users } from "../../dataProvider";
import { resourceName } from "../../ideExtension";
import { AnyPropsComponent } from "../../utils";

const meta = {
    title: "Navigation/Receipts",
    component: AnyPropsComponent,
    parameters: {
        docs: {
            canvas: {},
        },
    },
} satisfies Meta<typeof AnyPropsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const USERS = users.slice(1, 3);

export const UseLocation: Story = {
    name: "useLocation hook",
    render: ({...props}) => {
        const location = useLocation();

        return <GenerationInstructions.Exclude>
            <Stack direction="row" gap={2}>
                <TextField label={<>Current location</>} value={location.pathname} disabled/>
                <WhooshButton/>
            </Stack>
        </GenerationInstructions.Exclude>;
    },
    decorators: [
        (Story: () => React.JSX.Element) => {
            return (
                <MemoryRouter initialEntries={['/users']}>
                    <Routes>
                        <Route path={'/*'} element={<Story/>}/>
                    </Routes>
                </MemoryRouter>
            );
        },
    ],
};

const WhooshButton = () => {
    const paths = [
        '/users',
        '/departments',
        '/cats',
        '/dogs',
    ];

    const navigate = useNavigate();

    return <Button onClick={event => {
        navigate(paths[Math.floor(Math.random() * paths.length)]);
    }}>Whoosh</Button>;
};

export const ResourceListLink: Story = {
    name: 'Link to List page',
    render: ({ resourceName }) => {
        const createPath = useCreatePath();

        return (
            <Link to={createPath({ resource: resourceName, type: 'list' })}>Go to Users</Link>
        )
    },
    args: {
        resourceName: resourceName('users'),
    },
    parameters: {
        controls: { exclude: ['resourceName'] },
    },
    decorators: [
        // story page
        (Story) => {
            const location = useLocation();
            const id = location.pathname.split('/')[2];

            return (
                <Box>
                    <Paper>
                        <Stack padding={2}>
                            <Box>
                                <div>
                                    <span style={{ marginRight: '10px' }}>Id:</span>
                                    <span>{users.find(u => u.id === Number(id))?.id}</span>
                                </div>
                                <div>
                                    <span style={{ marginRight: '10px' }}>Name:</span>
                                    <span>{users.find(u => u.id === Number(id))?.name}</span>
                                </div>
                            </Box>
                            <Story/>
                        </Stack>
                    </Paper>
                </Box>
            )
        },

        // router
        (Story) => {
            const ListComponent = () => {
                return (
                    <Stack spacing={2}>
                        <Typography variant="h6">List Screen</Typography>
                        {USERS.map(user => {
                            return (
                                <Paper key={user.id} sx={{ p: 2 }}>
                                    {user.name}
                                </Paper>
                            )
                        })}
                        <Link to={'/users/2/show'}>Go back</Link>
                    </Stack>
                )
            }

            return (
                <>
                    <MemoryRouter initialEntries={['/users/2/show']}>
                        <Routes>
                            <Route path={'/users/:id/show'} element={<Story/>}/>
                            <Route path={'/users'} element={ListComponent()}/>
                        </Routes>
                    </MemoryRouter>
                </>
            );
        },
    ]
};

export const ResourceEditLink: Story = {
    name: 'Link to Edit page',
    render: ({ resourceName }) => {
        const createPath = useCreatePath();

        return (
            <>
                <GenerationInstructions.InsertOnly>
                    <Link to={createPath({ resource: resourceName, type: 'edit', id: 1 })}>Edit Bill</Link>
                </GenerationInstructions.InsertOnly>

                {USERS.map(user => {
                    return (
                        <div>
                            <Link key={user.id} to={createPath({
                                resource: 'users',
                                type: 'edit',
                                id: user.id
                            })}>Edit {user.name}</Link>
                        </div>
                    )
                })}</>
        )
    },
    args: {
        resourceName: resourceName('users')
    },
    parameters: {
        controls: { exclude: ['resourceName'] },
    },
    decorators: [
        (Story) => {
            const Component = () => {
                const createPath = useCreatePath();
                const location = useLocation();
                const id = location.pathname.split('/')[2];

                return (
                    <Stack>
                        <Typography variant="h6">Edit Screen</Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginRight: '10px' }}>Name:</span> <Input
                            value={users.find(u => u.id === Number(id))?.name}/>
                        </Box>
                        <Link to={createPath({ resource: 'users', type: 'list' })}>Go Back</Link>
                    </Stack>
                )
            }

            return (
                <>
                    <MemoryRouter initialEntries={['/users']}>
                        <Routes>
                            <Route path={'/users'} element={<Story/>}/>
                            <Route path={'/users/:id'} element={<Component/>}/>
                        </Routes>
                    </MemoryRouter>
                </>
            );
        },
    ],
};

export const ResourceCreateLink: Story = {
    name: 'Link to Create page',
    render: ({ resourceName }) => {
        const createPath = useCreatePath();

        return (
            <Link to={createPath({ resource: resourceName, type: "create" })}>Create User</Link>
        )
    },
    args: {
        resourceName: resourceName('users')
    },
    parameters: {
        controls: { exclude: ['resourceName'] },
    },
    decorators: [
        // story page
        (Story) => {
            return (
                <>
                    <Stack spacing={2}>
                        {USERS.map(user => {
                            return (
                                <Paper
                                    sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>{user.name}</Paper>
                            )
                        })}
                        <Story/>
                    </Stack>
                </>
            )
        },
        // router
        (Story) => {
            const CreateComponent = () => {
                const createPath = useCreatePath();

                return (
                    <Paper>
                        <Stack padding={2}>
                            <Typography variant="h6">Create Screen</Typography>
                            <Box sx={{ display: "flex", alignItems: "center" }}><span
                                style={{ marginRight: '10px' }}>Name:</span> <TextField/></Box>
                            <Link to={createPath({ resource: 'users', type: 'list' })}>Go Back</Link>
                        </Stack>
                    </Paper>
                )
            }

            return (
                <>
                    <MemoryRouter initialEntries={['/users']}>
                        <Routes>
                            <Route path={'/users'} element={<Story/>}/>
                            <Route path={'/users/create'} element={CreateComponent()}/>
                        </Routes>
                    </MemoryRouter>
                </>
            );
        }
    ]
};

export const ResourceShowLink: Story = {
    name: 'Link to Show page',
    render: ({ resourceName }) => {
        const createPath = useCreatePath();

        return (
            <>
                <GenerationInstructions.InsertOnly>
                    <Link to={createPath({ resource: resourceName, type: 'show', id: 1 })}>Go to Bill page info</Link>
                </GenerationInstructions.InsertOnly>
                {USERS.map(user => {
                    return (
                        <div>
                            <Link key={user.id} to={createPath({ resource: 'users', type: 'show', id: user.id })}>Go
                                to {user.name} page info</Link>
                        </div>
                    )
                })}
            </>
        )
    },
    args: {
        resourceName: resourceName('users')
    },
    parameters: {
        controls: { exclude: ['resourceName'] },
    },
    decorators: [
        (Story) => {
            const ShowComponent = () => {
                const createPath = useCreatePath();
                const location = useLocation();
                const id = location.pathname.split('/')[2];

                return (
                    <Box>
                        <Paper>
                            <Stack padding={2}>
                                <Typography variant="h6">Show Screen</Typography>
                                <Box>
                                    <div>
                                        <span style={{ marginRight: '10px' }}>Id:</span>
                                        <span>{users.find(u => u.id === Number(id))?.id}</span>
                                    </div>
                                    <div>
                                        <span style={{ marginRight: '10px' }}>Name:</span>
                                        <span>{users.find(u => u.id === Number(id))?.name}</span>
                                    </div>
                                </Box>
                                <Link to={createPath({ resource: 'users', type: 'list' })}>Go Back</Link>
                            </Stack>
                        </Paper>
                    </Box>
                )
            }

            return (
                <>
                    <MemoryRouter initialEntries={['/users']}>
                        <Routes>
                            <Route path={'/users'} element={<Story/>}/>
                            <Route path={'/users/:id/show'} element={<ShowComponent/>}/>
                        </Routes>
                    </MemoryRouter>
                </>
            );
        }
    ],
};