"use client"
import { useState, useEffect } from 'react';

function AddUser({ onUserAdded }) {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, surname, age })
            })

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const newUser = await response.json();
            onUserAdded(newUser);
            setName('');
            setSurname('');
            setAge('');
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }

    }


    return (
        <form className="bg-sky-800 flex flex-col w-full justify-center items-center" onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:
                    <input
                        className="w-full bg-black"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Surname:
                    <input
                        className="w-full bg-black"
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Age:
                    <input
                        className="w-full bg-black"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add User'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    )
}

export default AddUser;