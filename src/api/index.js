import axios from "axios";

const api=axios.create(
    {
        baseURL:process.env.REACT_APP_URL,
        headers:{
            Authorization:"Bearer 488a79fb74b6f3ed2e11120436f1c3717c0eebe51af90c741682989ecebbdc57"
        },
    }
)

export const addNewPost=async({title,body})=>{
    try{
        console.log("title",title, "body",body);
        const {data}=await api.post(`/users/17/posts`,{
            title,
            body,
        },{headers:{
            Authorization:"Bearer 488a79fb74b6f3ed2e11120436f1c3717c0eebe51af90c741682989ecebbdc57"
        }});
        return data;
    }catch(error){
        throw Error(error.response.status.Text);
    }

};


export const fetchPosts = async (id) =>{

    try {
        const {data}=await api.get(`/posts?page=${id}`);
        return data;
    } catch (error) {
        throw Error("unable to fetch the post data");
    }
    };

 
export const fetchPost = async (id) =>{

    try {
        const {data}=await api.get(`/posts/${id}`);
        return data;
    } catch (error) {
        throw("unable to fetch the post data");
    }
    };   
    