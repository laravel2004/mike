import {useAppwrite} from "@/service/context/AppwriteContext";
import {ID} from "appwrite";
import {useEffect} from "react";

const db_id = "6487d53c5eace3c2536a"; // Meeting

export function useDocument() {
    const { databases } = useAppwrite()

    const createDocument = async (collectionId, data= {}, permissions= [], dbId = db_id) => {
        return databases.createDocument(dbId, collectionId, ID.unique(), data, permissions); // add await
    }

    const listDocuments = async (collectionId, queries= [], dbId = db_id) => {
        if (queries.length !== 0){
            return databases.listDocuments(dbId, collectionId, queries)
        } else {
            return databases.listDocuments(dbId, collectionId);
        }
    }

    const getDocument = async (collectionId = '', documentId = '', dbId = db_id) => {
        return await databases.getDocument(dbId, collectionId, documentId);
    }

    const updateDocument = async (collectionId= '', documentId = '', data = {}, permissions = [], dbId = db_id) => {
        return await databases.updateDocument(dbId, collectionId, documentId, data, permissions);
    }

    const deleteDocument = async (collectionId = '', documentId = '', dbId = db_id) => {
        return await databases.deleteDocument(dbId, collectionId, documentId);
    }

    useEffect(() => {
        // Subscribes to channels here
    }, [])

    return {
        createDocument,
        listDocuments,
    }
}