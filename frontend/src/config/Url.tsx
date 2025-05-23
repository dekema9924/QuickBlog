


export const APIURL = {
    baseUrl: import.meta.env.MODE === "production" ? "https://blogify-backend.onrender.com" : "http://localhost:3000"
}

console.log("Base URL: ", APIURL.baseUrl)