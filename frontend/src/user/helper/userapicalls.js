
import { API } from '../../backend';


export const signin = async (user) => {

    const formData = new FormData()
    for (const name in user) {
        console.log(user[name])
        formData.append(name, user[name])
    }

    try {
        console.log(API)
        const response = await fetch(`${API}/accounts/signin/`, {
            method: "POST",
            body: formData,
        });
        const data = await response.json(); // Extract JSON data from the response
        // console.log("Success from userapi...", data); 
        return data;

    } catch (err) {
        return console.log(err);
    }

};
