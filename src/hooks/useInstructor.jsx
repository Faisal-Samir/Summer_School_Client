import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useInstructor = () => {
    const { user } = useContext(AuthContext);
    const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
        queryKey: ['isInstructor', user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://school-summer-camp-server.vercel.app/users/instructor/${user?.email}`)
            return res.data.instructor;
        },
    })
    return [isInstructor, isInstructorLoading];
};

export default useInstructor;