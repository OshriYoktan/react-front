import { Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {toyService} from '../../services/toyService'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './AxiosDetails.scss'

export const AxiosDetails = (props) => {

    const { data } = props

    const navigate = useNavigate()
    const [currToy, setCurrToy] = useState(null)

    const { id } = useParams()
    useEffect(() => {

        if (data) {
            var currToy = data.find(t => t._id === +id)  //MYSQL
            // var currToy = data.find(t => t._id === id)  //MONGODB
            setCurrToy(currToy)

        }
    }, [data, id])


    const handleToyChange = (e) => {
        const idx = data.findIndex(toy => toy._id === +id)  //MYSQL
        // const idx = data.findIndex(toy => toy._id === id)  //MONGODB
        const editedToy = {...currToy, [e.target.name]: e.target.value}
        toyService.save(editedToy).then(res => {
            setCurrToy(res)
            data.splice(idx,1,res)
        })

    }




    return (
        <div className='fruit-details'>
            {currToy ?
                <div className='form-details' >
                    <TextField type="text" onChange={handleToyChange} name='title' label={currToy.title} value={currToy.title} />
                    <Button  onClick={() => navigate('/')}> <ArrowBackIcon fontSize='large' /></Button>
                </div> 
                :<p>Not Found</p> 
            }

        </div>
    )
}
