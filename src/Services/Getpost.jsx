import axios from "axios";

const API = axios.create({
    
     baseURL: "https://jsonplaceholder.typicode.com"});


    //  Get Method

export const Getposts = () => {

    return API.get("/posts")

};


// Delete Method

export const Deletepost = (id) => {

    return API.delete(`/posts/${id}`)

};

// post method

export const Postdata = (post) => {

    return API.post("/posts", post)

};

// put method

export const Updatepost = (id, post) => {

    return API.put(`/posts/${id}`, post)

}