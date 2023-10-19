import axios from "@/utilities/axios";


export const Getpopularpost=()=>{
return axios.get("api/post/popular")
}

export const Getpostslug=(slug)=>{
    return axios.get("api/post/getBySlug/"+slug)
}

export const Getcommet=(postId)=>{
    return axios.get("api/comment",{params:{postId:postId}})
}

export const addcommet=(comment)=>{
    return axios.post("api/comment",comment)
}

export const Getpostsearch=(filter)=>{
    return axios.get("api/post",{params:{pageId:filter.pageId,take:filter.take,title:filter.title,CategorySlug:filter.category}})
}