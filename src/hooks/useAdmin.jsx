import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useAdmin = () => {
    const { user } = useContext(AuthContext);
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://school-summer-camp-server.vercel.app/users/admin/${user?.email}`)
            return res.data.admin;
        },
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;