import React, {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import axios from '../axiosPrivate';
import {useUserContext} from '../context/user_context';
import {toast} from 'react-toastify';

const SendToken = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const {saveUser, removeUser, setLoading} = useUserContext();


    const handleSaveToken = async (token) => {
        setLoading(true);
        try {
            localStorage.setItem('token', token);
            axios.defaults.headers['Authorization'] = `Bearer ${token}`;
            const {data} = await axios.get('/api/v1/users/showMe');
            saveUser(data.user);
            toast.success("Sign in successfully!");
            setLoading(false);
            navigate("/");

        } catch (error) {
            removeUser();
            setLoading(false);
            navigate("/signin");
            toast.error("Error something went wrong.");
        }
    }

    useEffect(()=>{
        const token = query.get("token");
        handleSaveToken(token);
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
