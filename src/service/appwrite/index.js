const { Client } = require("appwrite");

const endpoint = 'https://api.tulisno.com/v1';
const project_id = "642d7e31a2233791671f";


export const initializeClient = () => {
    let client = new Client()
        .setEndpoint(endpoint)
        .setProject(project_id);

    return client
}