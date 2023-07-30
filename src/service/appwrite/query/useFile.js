import {ID} from "appwrite";
import {useAppwrite} from "@/service/context/AppwriteContext";

export function useFile() {
    const {storage} = useAppwrite()

    const createFile = async (bucketId = '', file = {}, permissions = []) => {
        return await storage.createFile(bucketId, ID.unique(), file, permissions);
    }

    const listFiles = async (bucketId = '', queries= []) => {
        return await storage.listFiles(bucketId, queries);
    }

    const getFile = async (bucketId = '', fileId = '') => {
        return await storage.getFile(bucketId, fileId);
    }

    const getFileView = (bucketId = '', fileId = '') => {
        return storage.getFileView(bucketId, fileId);
    }

    const getFileDownload = (bucketId = '', fileId = '') => {
        return storage.getFileDownload(bucketId, fileId);
    }

    const deleteFile = async (bucketId = '', fileId = '') => {
        return await storage.deleteFile(bucketId, fileId);
    }

    return {

    }
}