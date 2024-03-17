import React from 'react';
import { BASEURL, USERS } from "../../../appConstant"
import axios from 'axios';

interface User {
    name: string;
    username: string;
    _id: string;
}

const RetroTable = ({usrMsg, setUsrMsg}: any) => {
    const [users, setUsers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);


    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASEURL}${USERS}`);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const usersData = await response.json();
            setIsLoading(false);
            console.log(usersData);
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    React.useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: any) => {
        try {
            setIsLoading(true);
            const response = await axios.delete(`${BASEURL}${USERS}/${id}`)
            console.log(response);
            setIsLoading(false);
            if (response.data.message === 'success') {
                fetchUsers();
            }
            else {
                alert('Failed to delete user');
            }

        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    const handleUserMessages = (user: any) => {
        console.log(user._id);
        setUsrMsg(user);
    }

    if (isLoading) {
        return (
            <div className='flex mt-64 justify-center text-center align-center'>
                <div role="status flex justify-center text-center align-center">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <>
            <h1 className='text-2xl font-bold ml-2 text-start ml-5 mb-5 mt-10 text-black'>Channels</h1>
            <div className="relative overflow-x-auto shadow-md mx-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-2 border-black">
                    <thead className="text-xs text-gray-700 uppercase bg-[#F3EDC8]">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                UserName
                            </th>
                            <th scope="col" className="px-6 py-3">
                                userid
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user: User, index: number) => (
                                <tr className="odd:bg-white even:bg-[#F3EDC8] border-b hover:bg-gray-200" onClick={() => {handleUserMessages(user)}}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {user.name}
                                    </th>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {user.username}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {user._id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => {
                                            handleDelete(user._id)
                                        }} className="font-medium text-red-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default RetroTable;
