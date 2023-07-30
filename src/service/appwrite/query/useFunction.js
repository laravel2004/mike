import {useAppwrite} from "@/service/context/AppwriteContext";

export function useFunction() {
    const {functions} = useAppwrite()

    const executeFunction = async (functionId = '', data = '') => {
        return await functions.createExecution(functionId, data);
    }

    return {

    }
}