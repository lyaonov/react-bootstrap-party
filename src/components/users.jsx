import { useState } from "react"
import API from "../API/API"

const Users = () => {

    const [users, setUsers] = useState(API.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers(users.filter(user => user._id !== userId))
    }

    const renderPhrase = (num) => {
        const lastOne = Number(num.toString().slice(-1))
        if (num > 4 && num < 15) return 'человек придет'
        if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека придут'
        if (lastOne === 1) return 'человек придет'
    }

    return (
        <>
            <h2 className="text-center m-2">
                <span
                    className={'badge bg-' + (users.length > 0 ? 'primary' : 'danger')}>
                    {users.length > 0
                        ? `${users.length} ${renderPhrase(users.length)} на вечеринку`
                        : 'Никто не придет'}
                </span>
            </h2>
            {!!users.length && <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качество</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th />
                    </tr>
                </thead>
                <tbody>

                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>
                                {user.qualities.map(item => <span className={'badge m-1 bg-' + item.color} key={item._id}>{item.name}</span>)}</td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate}</td>
                            <td>
                                <button
                                    className={'btn btn-danger'}
                                    onClick={() => handleDelete(user._id)}
                                >Удалить</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>}
        </>
    )
}

export default Users