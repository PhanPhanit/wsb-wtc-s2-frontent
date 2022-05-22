import React, {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useUserContext} from '../context/user_context';
import {toast} from 'react-toastify';
import {
    responseCookie
} from '../UrlEndPoint';

const SendToken = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const {saveUser, removeUser, setLoading} = useUserContext();


    const handleSendToken = async (token) => {
        setLoading(true);
        try {
            const {data} = await axios.post(responseCookie, {token});
            saveUser(data.user)
            navigate("/");
            setLoading(false);
            toast.success("Sign in successfully!")
        } catch (error) {
            removeUser();
            setLoading(false);
            navigate("/signin");
            toast.error("Error something went wrong.");
        }
    }

    useEffect(()=>{
        const token = query.get("token");
        handleSendToken(token);
    }, [])

    return (
        <h1>Loading...</h1>
    )
}

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default SendToken
