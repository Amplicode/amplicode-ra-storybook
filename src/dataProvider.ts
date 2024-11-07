import fakeDataProvider from "ra-data-fakerest";
import { DataProvider } from "react-admin";

export const users = [
    {
        id: 1,
        role: "admin",
        active: false,
        city: "Tokyo",
        date: "01/08/1991",
        time: "10:56:09",
        email: "bill@gmail.com",
        url: "http://mysocialnetwork.com",
        name: "Bill",
        day_offs: 0,
        department_id: 1,
        role_ids: [1, 3],
        password: 'test'
    },
    {
        id: 2,
        role: "admin",
        active: true,
        city: "Tokyo",
        date: "01/08/1991",
        time: "10:56:09",
        email: "jack@gmail.com",
        url: "http://hissocialnetwork.com",
        name: "Jack",
        day_offs: 20,
        department_id: 2,
        role_ids: [1, 2],
        password: 'test'
    },
    {
        id: 3,
        role: "customer",
        active: false,
        city: "NY",
        date: "01/08/1991",
        time: "10:56:09",
        email: "samantha@gmail.com",
        name: "Samantha",
        day_offs: 30,
        department_id: 3,
        role_ids: [1, 2, 3]
    },
    {
        id: 4,
        role: "admin",
        active: false,
        city: "Tokyo",
        date: "01/08/1991",
        time: "10:56:09",
        email: "derek@gmail.com",
        name: "Derek",
        day_offs: 40,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 5,
        role: "admin",
        active: false,
        city: "Tokyo",
        date: "01/08/1991",
        time: "10:56:09",
        email: "rosa@gmail.com",
        name: "Rosa",
        day_offs: 50,
        department_id: 2,
        role_ids: [1, 2, 3]
    },
    {
        id: 6,
        role: "admin",
        active: false,
        city: "NY",
        date: "01/08/1991",
        time: "10:56:09",
        email: "amber@gmail.com",
        name: "Amber",
        day_offs: 60,
        department_id: 3,
        role_ids: [1, 2, 3]
    },
    {
        id: 7,
        role: "admin",
        active: false,
        city: "Tokyo",
        date: "01/08/1991",
        time: "10:56:09",
        email: "john@gmail.com",
        name: "John",
        day_offs: 70,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 11,
        role: "admin",
        active: false,
        city: "Tokyo",
        date: "01/08/1991",
        time: "10:56:09",
        email: "bill@gmail.com",
        url: "http://mysocialnetwork.com",
        name: "Bill",
        day_offs: 0,
        department_id: 1,
        role_ids: [1, 3],
        password: 'test'
    },
    {
        id: 12,
        role: "admin",
        active: true,
        city: "Tokyo",
        date: "01/08/1991",
        time: "10:56:09",
        email: "jack@gmail.com",
        url: "http://hissocialnetwork.com",
        name: "Jack",
        day_offs: 20,
        department_id: 2,
        role_ids: [1, 2],
        password: 'test'
    },
    {
        id: 13,
        role: "customer",
        active: false,
        city: "NY",
        date: "01/08/1991",
        time: "10:56:09",
        email: "samantha@gmail.com",
        name: "Samantha",
        day_offs: 30,
        department_id: 3,
        role_ids: [1, 2, 3]
    },
    {
        id: 14,
        role: "admin",
        active: false,
        city: "Tokyo",
        date: "01/08/1991",
        time: "10:56:09",
        email: "derek@gmail.com",
        name: "Derek",
        day_offs: 40,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 15,
        role: "admin",
        active: false,
        city: "Tokyo",
        date: "01/08/1991",
        time: "10:56:09",
        email: "rosa@gmail.com",
        name: "Rosa",
        day_offs: 50,
        department_id: 2,
        role_ids: [1, 2, 3]
    },
    {
        id: 16,
        role: "admin",
        active: false,
        city: "NY",
        date: "01/08/1991",
        time: "10:56:09",
        email: "amber@gmail.com",
        name: "Amber",
        day_offs: 60,
        department_id: 3,
        role_ids: [1, 2, 3]
    },
    {
        id: 17,
        role: "admin",
        active: false,
        city: "Tokyo",
        date: "01/08/1991",
        time: "10:56:09",
        email: "john@gmail.com",
        name: "John",
        day_offs: 70,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 21,
        role: "admin",
        active: false,
        city: "Tokyo",
        date: "01/08/1991",
        time: "10:56:09",
        email: "bill@gmail.com",
        url: "http://mysocialnetwork.com",
        name: "Bill",
        day_offs: 0,
        department_id: 1,
        role_ids: [1, 3],
        password: 'test'
    },
    {
        id: 22,
        role: "admin",
        active: true,
        city: "Tokyo",
        date: "01/08/1991",
        time: "10:56:09",
        email: "jack@gmail.com",
        url: "http://hissocialnetwork.com",
        name: "Jack",
        day_offs: 20,
        department_id: 2,
        role_ids: [1, 2],
        password: 'test'
    },
    {
        id: 23,
        role: "customer",
        active: false,
        city: "NY",
        date: "01/08/1991",
        time: "10:56:09",
        email: "samantha@gmail.com",
        name: "Samantha",
        day_offs: 30,
        department_id: 3,
        role_ids: [1, 2, 3]
    },
    {
        id: 24,
        role: "admin",
        active: false,
        city: "Tokyo",
        date: "01/08/1991",
        time: "10:56:09",
        email: "derek@gmail.com",
        name: "Derek",
        day_offs: 40,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 25,
        role: "admin",
        active: false,
        city: "Tokyo",
        date: "01/08/1991",
        time: "10:56:09",
        email: "rosa@gmail.com",
        name: "Rosa",
        day_offs: 50,
        department_id: 2,
        role_ids: [1, 2, 3]
    },
    {
        id: 26,
        role: "admin",
        active: false,
        city: "NY",
        date: "01/08/1991",
        time: "10:56:09",
        email: "amber@gmail.com",
        name: "Amber",
        day_offs: 60,
        department_id: 3,
        role_ids: [1, 2, 3]
    },
    {
        id: 27,
        role: "admin",
        active: false,
        city: "Tokyo",
        date: "01/08/1991",
        time: "10:56:09",
        email: "john@gmail.com",
        name: "John",
        day_offs: 70,
        department_id: 1,
        role_ids: [1, 2, 3]
    }
];

export const departments = [
    {
        id: 1,
        name: "Sales"
    },
    {
        id: 2,
        name: "Management"
    },
    {
        id: 3,
        name: "Development"
    },
    {
        id: 4,
        name: "QA"
    }
];

export const roles = [
    {
        id: 1,
        name: 'Editor'
    },
    {
        id: 2,
        name: 'Viewer'
    },
    {
        id: 3,
        name: 'Creator'
    }
];

export const tasks = [
    { id: 1, name: 'Win a Nobel Prize', user_id: 2, done: true },
    { id: 2, name: 'Win a Nobel Prize', user_id: 1, done: false },
    { id: 3, name: 'Race a Rocket', user_id: 2, done: true },
    { id: 4, name: 'Dance on a Volcano', user_id: 2, done: true },
    { id: 5, name: 'Design a Spaceship', user_id: 4, done: false },
    { id: 6, name: 'Dance on a Volcano', user_id: 5, done: false },
    { id: 7, name: 'Discover a New Element', user_id: 1, done: false },
    { id: 8, name: 'Write a Bestseller', user_id: 2, done: true },
    { id: 9, name: 'Paint a Masterpiece', user_id: 3, done: true },
    { id: 10, name: 'Tame a Dragon', user_id: 2, done: false },
    { id: 11, name: 'Dance on a Volcano', user_id: 2, done: true },
    { id: 12, name: 'Win a Nobel Prize', user_id: 1, done: true },
    { id: 13, name: 'Sing with Whales', user_id: 3, done: true },
    { id: 14, name: 'Design a Spaceship', user_id: 2, done: false },
    { id: 15, name: 'Build a Robot', user_id: 1, done: true },
    { id: 16, name: 'Dance on a Volcano', user_id: 2, done: false },
    { id: 17, name: 'Win a Nobel Prize', user_id: 4, done: false },
    { id: 18, name: 'Solve World Peace', user_id: 5, done: true },
    { id: 19, name: 'Tame a Dragon', user_id: 1, done: false },
    { id: 20, name: 'Paint a Masterpiece', user_id: 5, done: true }
];

export const competences = [
    {id: 1, name: 'Backend Developer', description: 'Java/Spring backend development'},
    {id: 2, name: 'Frontend Developer', description: 'TS, JS, React'},
]

export const userCompetences = [
    {id: 1, userId: 1, competenceId: 1, grade: 'Senior'},
    {id: 2, userId: 1, competenceId: 2, grade: 'Middle'},
]


export const dataProvider = fakeDataProvider({
    users,
    departments,
    roles,
    tasks,
    competences,
    userCompetences,
});

async function delay() {
    return new Promise(resolve => setTimeout(resolve, 1_000));
}

// @ts-ignore
function withDelay(func) {
    // @ts-ignore
    return async function (...args) {
        await delay();
        // @ts-ignore
        return func.apply(this, args);
    };
}

export const delayDataProvider: DataProvider = {
    create: withDelay(dataProvider.create),
    delete: withDelay(dataProvider.delete),
    deleteMany: withDelay(dataProvider.deleteMany),
    getList: withDelay(dataProvider.getList),
    getMany: withDelay(dataProvider.getMany),
    getManyReference: withDelay(dataProvider.getManyReference),
    getOne: withDelay(dataProvider.getOne),
    update: withDelay(dataProvider.update),
    updateMany: withDelay(dataProvider.updateMany),
};
