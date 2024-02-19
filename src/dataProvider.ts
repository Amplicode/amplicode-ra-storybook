import fakeDataProvider from "ra-data-fakerest";
import { DataProvider } from "react-admin";

export const users = [
    {
        id: 1,
        role: "admin",
        active: false,
        city: "Tokyo",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Bill",
        day_offs: 90,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 2,
        role: "admin",
        active: true,
        city: "Tokyo",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Jack",
        day_offs: 20,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 3,
        role: "customer",
        active: false,
        city: "NY",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Samantha",
        day_offs: 30,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 4,
        role: "admin",
        active: false,
        city: "Tokyo",
        birthday: "01/08/1991",
        email: "test@gmail.com",
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
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Rosa",
        day_offs: 50,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 6,
        role: "admin",
        active: false,
        city: "NY",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Amber",
        day_offs: 60,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 7,
        role: "admin",
        active: false,
        city: "Tokyo",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "John",
        day_offs: 70,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 11,
        role: "customer",
        active: false,
        city: "Tokyo",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Bill",
        day_offs: 90,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 12,
        role: "admin",
        active: true,
        city: "Tokyo",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Jack",
        day_offs: 20,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 13,
        role: "admin",
        active: false,
        city: "NY",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Samantha",
        day_offs: 30,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 14,
        role: "admin",
        active: false,
        city: "Tokyo",
        birthday: "01/08/1991",
        email: "test@gmail.com",
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
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Rosa",
        day_offs: 50,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 16,
        role: "admin",
        active: false,
        city: "NY",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Amber",
        day_offs: 60,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 17,
        role: "admin",
        active: false,
        city: "Tokyo",
        birthday: "01/08/1991",
        email: "test@gmail.com",
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
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Bill",
        day_offs: 90,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 22,
        role: "customer",
        active: true,
        city: "Tokyo",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Jack",
        day_offs: 20,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 23,
        role: "admin",
        active: false,
        city: "NY",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Samantha",
        day_offs: 30,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 24,
        role: "admin",
        active: false,
        city: "Tokyo",
        birthday: "01/08/1991",
        email: "test@gmail.com",
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
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Rosa",
        day_offs: 50,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 26,
        role: "admin",
        active: false,
        city: "NY",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Amber",
        day_offs: 60,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 27,
        role: "admin",
        active: false,
        city: "Tokyo",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "John",
        day_offs: 70,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 31,
        role: "admin",
        active: false,
        city: "Tokyo",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Bill",
        day_offs: 90,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 32,
        role: "admin",
        active: true,
        city: "Tokyo",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Jack",
        day_offs: 20,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 33,
        role: "customer",
        active: false,
        city: "NY",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Samantha",
        day_offs: 30,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 34,
        role: "admin",
        active: false,
        city: "Tokyo",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Derek",
        day_offs: 40,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 35,
        role: "admin",
        active: false,
        city: "Tokyo",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Rosa",
        day_offs: 50,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 36,
        role: "admin",
        active: false,
        city: "NY",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "Amber",
        day_offs: 60,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
    {
        id: 37,
        role: "admin",
        active: false,
        city: "Tokyo",
        birthday: "01/08/1991",
        email: "test@gmail.com",
        name: "John",
        day_offs: 70,
        department_id: 1,
        role_ids: [1, 2, 3]
    },
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

export const dataProvider = fakeDataProvider({
    users,
    departments,
    roles
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
