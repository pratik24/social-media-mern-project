import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Feed from '../../components/feed/Feed'
import RightBar from '../../components/rightbar/RightBar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'
import './home.css'

export default function Home() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if(!user){
            navigate("/login", {replace: true})
        }
    }, [user]);

    return (
        <>
        
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Feed />
                <RightBar />
            </div>
        </>
    )
}
