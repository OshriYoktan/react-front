import './AxiosPreview.scss'
import { useNavigate } from 'react-router-dom'
import Moment from 'react-moment';

export const AxiosPreview = (props) => {

    const { user } = props
    const navigate = useNavigate()

    const delUser = (e,id) => {
        e.stopPropagation()
        props.delUser(id) 

    }

    return (
        <div onClick={() => navigate(`/toy/${user._id}`)} className='axios-preview'>
            <a>{user.title}</a>
            <Moment fromNow>{user.date}</Moment>
            <button onClick={(e) => delUser(e,user._id)}>x</button>
        </div>
    )
}
