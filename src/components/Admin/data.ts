import CustomStore from "devextreme/data/custom_store";
import {store} from "@/store/makeStore";
import {adminApi} from "@/services/api/adminApi";
import {baseUrlApi} from "@/app.config";

export const userStore = new CustomStore({
    key: 'id',
    load: async (loadOptions) => {
        // @ts-ignore
        const {data} = await store.dispatch(adminApi.endpoints.show.initiate("user/show"));
        return {
            data: data?.data.data,
            totalCount: data?.data.total,
            summary: data?.data.total,
        }
    },
    update: async (key, values) => {
        return await store.dispatch(adminApi.endpoints.updateUser.initiate({id:key,...values}));
    },
    // @ts-ignore
    remove: async (key) => {
        return await store.dispatch(adminApi.endpoints.removeUser.initiate({id:key}));
    },
    insert: async (values) => {
        return await store.dispatch(adminApi.endpoints.createUser.initiate({...values}));
    },
    byKey: async (loadOptions) => {
        // @ts-ignore
        const {data} = await store.dispatch(adminApi.endpoints.show.initiate("user/show"));
        return data.data;
    }
});

export const levelStore = new CustomStore({
    key: 'id',
    load: async (loadOptions) => {
        // @ts-ignore
        const {data} = await store.dispatch(adminApi.endpoints.show.initiate("level/show"));
        return {
            data: data.data,
            totalCount: data.data.length,
            summary: data.data.length,
        }
    },
    update: async (key, values) => {
        return await store.dispatch(adminApi.endpoints.updateLevel.initiate({name:values.name,id:key}));
    },
    byKey: async (loadOptions) => {
        // @ts-ignore
        const {data} = await store.dispatch(adminApi.endpoints.show.initiate("level/show"));
        return data.data;
    }
});

export const roomStore = new CustomStore({
    key: 'id',
    load: async (loadOptions) => {
        // @ts-ignore
        const {data} = await store.dispatch(adminApi.endpoints.show.initiate("room/show"));
        return {
            data: data.data,
            totalCount: data.data.length,
            summary: data.data.length,
        }
    },
    update: async (key, values) => {
        return await store.dispatch(adminApi.endpoints.updateRoom.initiate({name:values.name,id:key}));
    },
    // @ts-ignore
    remove: async (key) => {
        return await store.dispatch(adminApi.endpoints.removeRoom.initiate({id:key}));
    },
    byKey: async (loadOptions) => {
        // @ts-ignore
        const {data} = await store.dispatch(adminApi.endpoints.show.initiate("room/show"));
        return data.data;
    }
});

export const unitStore = new CustomStore({
    key: 'id',
    load: async (loadOptions) => {
        // @ts-ignore
        const {data} = await store.dispatch(adminApi.endpoints.show.initiate("unit/show"));
        return {
            data: data.data,
            totalCount: data.data.length,
            summary: data.data.length,
        }
    },
    update: async (key, values) => {
        return await store.dispatch(adminApi.endpoints.updateUnit.initiate({name:values.name,id:key}));
    },
    byKey: async (loadOptions) => {
        // @ts-ignore
        const {data} = await store.dispatch(adminApi.endpoints.show.initiate("unit/show"));
        return data.data;
    }
});

const demo = new CustomStore({
    key: 'id',
    load:async (loadOptions) =>{
        var myHeaders = new Headers();
        myHeaders.append("ngrok-skip-browser-warning", "69420");
        myHeaders.append("Authorization", "Bearer 24|it16OjHwcQc69qYE3uqhBAsal0siN9bxY38CLJsB");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        // @ts-ignore
        const res =await fetch(`${baseUrlApi}/unit/show`, requestOptions);
        const data =await res.json();
        return {
            data: data.data,
            totalCount: data.data.length,
            summary:data.data.length,
        }
    },
    update:(key, values)=>{
        var myHeaders = new Headers();
        myHeaders.append("ngrok-skip-browser-warning", "69420");
        myHeaders.append("Authorization", "Bearer 24|it16OjHwcQc69qYE3uqhBAsal0siN9bxY38CLJsB");
        var formdata = new FormData();
        formdata.append("id", key);
        formdata.append("name", values.name);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:formdata,
            redirect: 'follow'
        };
        // @ts-ignore
        return fetch(`${baseUrlApi}/unit/update`, requestOptions)
    }
});
