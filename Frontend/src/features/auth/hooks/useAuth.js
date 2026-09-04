import { useContext, useEffect } from "react";
import { login, getMe, register, logOut } from "../services/auth.api";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, loading, setLoading, setUser } = context

    async function handleRegister({ email, username, password }) {
        setLoading(true)
        const data = await register({ email, username, password })
        console.log(data)
        setUser(data)
        setLoading(false)

    }
    async function handleLogin({ email, username, password }) {
        setLoading(true)
        const data = await login({ email, username, password })
        setUser(data)
        setLoading(false)
    }
    async function handleGetMe() {
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }
    async function handleLogOut() {
        setLoading(true)
        const data = await logOut()
        setUser(null)
        setLoading(false)
    }
    useEffect(()=>{
        handleGetMe()
    },[])
    return ({
        handleRegister, handleLogin, handleGetMe, handleLogOut, user, loading, setLoading, setUser
    })
}