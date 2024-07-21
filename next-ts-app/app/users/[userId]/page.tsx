import { getUser, getUsers } from "../../../services/usersApi";

type User = {
    id: string;
    name: string;
    email: string;
}

const UsersPage = async ({ params }: any) => {

    try {
        const userId = params.userId;

        const user: User = await getUser(userId);

        return (
            <>
                <h1>User {userId} Page</h1>
                <ul>
                    <li key={user.id}>{user.name} - {user.email}</li>
                </ul>
            </>
        )
    } catch (error) {
        const userId = params.userId;
        console.error(`User page error: ${error}`);
        return <h1>User not found with id {userId}</h1>;
    }
}


export default UsersPage;