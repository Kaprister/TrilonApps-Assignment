import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllPlayersMutation } from '../store/userApiSlice';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

function Players() {
    const [allPlayers, setAllPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userInfo, status } = useSelector((state) => state.auth);
    const [getAllPlayers] = useGetAllPlayersMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
    }, [userInfo, navigate])

    useEffect(() => {
        const getPlayers = async () => {
            try {
                const res = await getAllPlayers().unwrap();
                // console.log(res.users);
                // setAllPlayers((prev) => [...prev, res.users]);
                setAllPlayers([...res.users]);

                // console.log("hello :: ",allPlayers);
            } catch (error) {
                console.error('Error fetching players:', error);
            } finally {
                setLoading(false);
            }
        };
        getPlayers();
    }, [status, getAllPlayers]);

    if (loading) {
        return (
            <div className='d-flex justify-content-center align-item-center w-100% h-100%'>
                <Loader />
            </div>
        );
    }
    // console.log(allPlayers[1]);


    return (
        <div className=' d-flex justify-content-center align-item-center gap-10 flex-column'>
            <h2>Hello Players</h2>
            {allPlayers && allPlayers.length > 0 ? (
                <div>
                    {allPlayers.map(player => (
                        <div key={player._id}>
                            <div>{player.username}</div>
                            <div>{player.email}</div>
                            <div></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No players available</div>
            )}
        </div>
    );
}

export default Players;
