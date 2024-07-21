import { getUser, getUsers } from "../../services/usersApi";

type User = {
    id: string;
    name: string;
    email: string;
}

const UsersPage = async () => {

    const users: User[] = await getUsers();

    return(
        <>
            <h1>Users Page</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </>
    )
}


export default UsersPage;