import { RootContext } from '@/service/context/Context'
import Head from 'next/head'
import Image from 'next/image';
import NavbarLogin from '@/components/organisme/NavbarLogin';
import Layout from '@/components/molecules/Layout';
import google from '@/assets/icons8-google-48.png'
import facebook from '@/assets/icons8-facebook-48.png'
import iconlogin from "@/assets/icon-login.png"
import Link from 'next/link';
import Button from '@/components/atom/Button';
import ButtonText from '@/components/atom/ButtonText';
import ButtonImg from '@/components/molecules/ButtonImg';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Input from '@/components/atom/Input';
import {useAccount} from "@/service/appwrite/query/useAccount";


const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const contex = useContext(RootContext)
    const {state, dispatch} = contex;
    let data = '';
    const {login, googleAuth} = useAccount();

    const handleLogin = async () => {
        login(email, password)
            .finally(() => router.push({
                pathname: '/chat/[ownerId]',
                query: {ownerId : '13241321'}
            }))
    }

    return(
        <>
        <Head>
            <title>MyCap - Login</title>
            <meta name="description" content="Generated b y create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavbarLogin />

        <Layout
            className="flex justify-center"
        >
            <div className="mt-8 shadow-2xl p-9 rounded-xl md:min-w-[728px] ">
                <p className="font-bold text-4xl text-gray-700 dark:text-white">Login</p>

                <div className="mt-9 px-4 md:px-36">
                    <Input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="text-center mt-9">
                        <p className="font-medium text-sm text-gray-700 mb-2 dark:text-slate-400">atau masuk dengan</p>
                        <div className="mx-auto rounded-full shadow-lg grid grid-cols-2 py-1 max-w-[240px] divide-x divide-primary-teal">
                            <Link className="justify-self-center px-10" href="/" onClick={googleAuth}>
                                <Image src={google} className=""></Image>
                            </Link>
                            <Link className="justify-self-center px-10" href="/">
                                <Image src={facebook} className=""></Image>
                            </Link>
                        </div>

                        <div className="text-center mt-20">
                            <ButtonText 
                                title="Belum punya akun?" 
                                link="Daftar"
                                url = "regis"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-14 flex justify-between">
                    <Button title="Login Nanti (as guest)" className="bg-primary-gray font-medium text-primary-teal rounded-full"/>
                    <div>
                        <ButtonImg img={iconlogin} onClick={handleLogin} 
                        title="Login"
                        backGround="bg-secondary-teal"
                        textColor="text-white dark:text-white"
                        padding="p-4"
                        />
                    </div>
                </div>
            </div>
        </Layout>
        </>
    )
}

export default Login