import axios from "axios";
import { useEffect, useState } from "react";
import CardComponent from "./CardComponent";

interface User {
    id: number;
    name: string
    email: string
}

interface UserInterfaceProps {
    backendName: string;
}

const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    const [users, setUsers] = useState<User[]>([])
    const [newUser, setNewUser] = useState({name: '', email: ''});
    const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: ''})

    const backgroundColors: { [key: string]: string }= {
        go: 'bg-cyan-500'
    };
    const buttonColors: { [key: string]: string} = {
        go: 'bg-cyan-700 hover:bg-blue-600'
    }


    const bgColor = backgroundColors[backendName as keyof typeof backgroundColors] || 'bg-gray-200';
    const btnColors = buttonColors[backendName as keyof typeof buttonColors] || 'bg-gray-500 hover:bg-gray-600';

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/${backendName}/users`);
                setUsers(response.data.reverse());
            } catch (error) {
                console.error("Error fetching data", error)
            }
        }
        fetchdata();
    }, [backendName, apiUrl])
    return (
        <div className={`user-interface ${bgColor} ${backendName} w-full max-w-md p-4 my-4 rounded shadow `}>
            <img src={`/${backendName}logo.svg`} alt={`${backendName} Logo`} className="w-20 h-20 mb-6 mx-auto" />
            <h2 className="text-xl font-bold text-center text-shite mb-6">
                {`${backendName.charAt(0).toUpperCase() + backendName.slice(1)} Backend`}
            </h2>
            {/* Display Users */}

            <div className="space-y-4">
                {users.map((user) => (
                    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow" key={user.id}>
                        <CardComponent card={user} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserInterface;
