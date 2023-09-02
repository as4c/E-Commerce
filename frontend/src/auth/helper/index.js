import { cartEmpty } from "../../core/Helper/carthelper";
import {API} from "../../backend"

// export const signup=async (user)=>{
//     try {
//         const response = axios.get('http://localhost:8000/api/user',
//             {
//                 method: "POST",
//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(user)
//             });
//         return response.json();
//     } catch (err) {
//         return console.log(err);
//     }   
// };


export const signup = async (user) =>{
    try {
        const response = await fetch(`${API}user/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};


export const signin =async (user)=>{
    const formData = new FormData()
    for(const name in user){
        console.log(user[name])
        formData.append(name,user[name])
    }

    for(var key of formData.keys()){
        console.log("MyKey",key)
    }

    try {
        const response = await fetch(`${API}user/login/`, {
            method: "POST",
            body: formData,
        });
        console.log("Success", response);
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
    
};

// export const signin =async (user)=>{
//     const formData = new FormData()
//     for(const name in user){
//         formData.append(name,user[name])
//     }
    
//     try {
//         const response = axios.get('http://localhost:8000/api/user/login/', {
//             method: "POST",
//             body: formData
//         });
//         return response.json();
//     } catch (err) {
//         return console.log(err);
//     }
// }

export const authenticate = (data, next)=>{
    if(typeof window !== undefined){
        localStorage.setItem("jwt",JSON.stringify(data));
        next();
    }
};

export const isAuthenticated=()=>{
    if(typeof window == undefined){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
        //TODO:compare JWT with database json token
    }else{
        return false
    }
};

export const signout = next =>{
    const userId = isAuthenticated() && isAuthenticated().user.id

    if(typeof window !== undefined){
        localStorage.removeItem("jwt")
        cartEmpty(()=>{});
        // next();
        return fetch(`${API}user/logout/${userId}`,{
            method:"GET",
        })
        .then((response)=>{
            console.log("Signout Success");
            next();
        })
        .catch((err)=>console.log(err))
    }
}

