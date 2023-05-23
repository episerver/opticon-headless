import authService from "../AuthService";
import Config from "../config.json";

export const getData = async (url: string, header?: any) => {
    const res = await fetch(`${Config.BASE_URL}${url}`, {
        method: 'GET',
        headers: await getHeaders(header)
    })

    const data = await res.json();
    return {status: res.status, data};
}

export const postData = async (url: string, body: any, header?: any) => {
    const res = await fetch(`${Config.BASE_URL}${url}`, {
        method: 'POST',
        headers: await getHeaders(header),
        body: JSON.stringify(body)
    })

    const data = await res.json();
    return {status: res.status, data};
}

export const putData = async (url: string, body: any, header?: any) => {
    const res = await fetch(`${Config.BASE_URL}${url}`, {
        method: 'PUT',
        headers: await getHeaders(header),
        body: JSON.stringify(body)
    })

    const data = await res.json();
    return {status: res.status, data};
}

export const patchData = async (url: string, body: any, header?: any) => {
    const res = await fetch(`${Config.BASE_URL}${url}`, {
        method: 'PATCH',
        headers: await getHeaders(header),
        body: JSON.stringify(body)
    })

    const data = await res.json();
    return {status: res.status, data};
}

export const deleteData = async (url: string, header?: any) => {
    const res = await fetch(`${Config.BASE_URL}${url}`, {
        method: 'DELETE',
        headers: await getHeaders(header)
    })

    const data = await res.json();
    return {status: res.status, data};
}

const getHeaders = async (header: any) => {
    let accessToken = await authService.getAccessToken();
    if(!accessToken){
        accessToken = localStorage.getItem("anonymous_access_token");
    }
    const defaultHeader = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`
    }
   return !!header ? header : defaultHeader;
}