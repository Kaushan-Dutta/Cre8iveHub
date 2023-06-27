import { Client, Account, Databases } from 'appwrite';



const client = new Client()
client.setEndpoint('https://cloud.appwrite.io/v1').setProject(process.env.project_id); //project id
export const account = new Account(client);//authentication

export const databases = new Databases(client);//database
