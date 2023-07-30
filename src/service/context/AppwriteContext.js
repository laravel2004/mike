import {createContext, useContext, useMemo} from "react";
const { Account, Databases, Functions, Storage } = require("appwrite");

export const AppwriteContext = createContext();

export function AppwriteProvider({ client, children, ...props }) {
    const value = useMemo(() => ({
        client,
        account: new Account(client),
        databases: new Databases(client),
        functions: new Functions(client),
        storage: new Storage(client),
        function: new Functions(client),
    }), [])

    return (
        <AppwriteContext.Provider value={value}>
            {children}
        </AppwriteContext.Provider>
    )
}

export const useAppwrite = () => useContext(AppwriteContext)