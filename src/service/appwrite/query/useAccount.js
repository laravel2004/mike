import {useAppwrite} from "@/service/context/AppwriteContext";
import {ID} from "appwrite";
import { setCookie } from 'cookies-next';

const auth_success_callback = `${process.env.BASE_URL}/chat/redirect`;
const auth_failed_callback = `${process.env.BASE_URL}/auth/login`;


export function useAccount() {
    const {account} = useAppwrite()

    const register = async (
        email,
        password,
        name
    ) => {
        return await account.create(ID.unique(), email, password, name);
    };

    const login = async (email, password) => {
        return await account.createEmailSession(email, password);
    };

    const createVerification = async (route) => {
        route = window.location.origin + route;
        return await account.createVerification(route);
    }

    const updateVerification = async (userId, secret) => {
        return await account.updateVerification(userId, secret);
    }

    const googleAuth = () => {
        // set cookies
        setCookie('logged', 'true');
        
        return account.createOAuth2Session(
            'google',
            auth_success_callback,
            auth_failed_callback
        );
    };

    const getCurrentSession = async () => {
        return await account.getSession('current');
    }

    const deleteCurrentSession = async () => {
        return await account.deleteSession('current');
    }

    const getUserData = async () => {
        return await account.get();
    };

    const logout = async () => {
        return await account.deleteSession('current');
    };

    const updateName = async (name) => {
        return await account.updateName(name);
    }

    return {
        register,
        login,
        googleAuth,
        getUserData,
        logout,
        getCurrentSession,
        updateName,
    }
}