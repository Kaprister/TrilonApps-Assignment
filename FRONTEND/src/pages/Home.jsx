import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useGetPlayerDetailsMutation } from '../store/userApiSlice';
import { toast } from 'react-toastify';

function Home() {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth)
    const [username, setUsername] = useState('');
    const [getPlayerDetails] = useGetPlayerDetailsMutation();
    const [playersInfo, setPlayersInfo] = useState(false);
    const [isClick, setIsClick] = useState(false)

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
    }, [userInfo, navigate])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setIsClick((prev) => !prev)
            const accessToken = userInfo.accessToken;
            const res = await getPlayerDetails({ accessToken, username }).unwrap();
            // setPlayersInfo(res.user);
            setPlayersInfo((prev) => !prev)
        } catch (error) {
           toast.error(error?.data?.message || error.error);
        }
    }

    return (
        <div className='d-flex flex-column align-items-center gap-10 pt-10'>
            <h1>Welcome to Home Page</h1>
            <div className='d-flex justify-content-center gap-10 p-10 flex-column'>
                <form className="d-flex justify-content-center w-full" onSubmit={submitHandler}>
                    <input
                        type='text'
                        className='form-control me-2'
                        placeholder='Search a player'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button className='btn btn-outline-primary' type='submit'>Search</button>
                </form>
                {isClick &&
                    <div>

                {playersInfo ? (
                    <div>
                        Player Found
                    </div>
                ) : (
                    <div>Player Not Found</div>
                )}
                    </div>
                }

            </div>
        </div>
    )
}

export default Home
