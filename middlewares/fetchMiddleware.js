import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

//created a function for curl request
export const fetchData = async (next) => {
    try {
        //fetching a third party api
        const response = await fetch('https://intent-kit-16.hasura.app/api/rest/blogs', {
            method: "GET",
            headers: { 'x-hasura-admin-secret': process.env.Admin_Secret_Key }
        });
        //if response if ok 
        if (response.status === 200) {
            const data = await response.json();
            let dataArray = data.blogs;
            return dataArray;
        }
        else {
            return next(createError(500, "Failed to fetch data")); //error handling function
        }
    } catch (error) {
        next(error); //error handling function
    }
};