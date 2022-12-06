import { Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {fruitService} from '../../services/fruitService'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './FruitDetails.scss'

export const FruitDetails = (props) => {

    const { data } = props

    const navigate = useNavigate()
    const [currFruit, setCurrFruit] = useState(null)

    const { id } = useParams()
    useEffect(() => {

        if (data) {
            var currFruit = data.find(t => t._id === +id)  
            setCurrFruit(currFruit)

        }
    }, [data, id])


    const handleFruitChange = (e) => {
        const idx = data.findIndex(fruit => fruit._id === +id)  
        const editedFruit = {...currFruit, [e.target.name]: e.target.value}
        fruitService.save(editedFruit).then(res => {
            setCurrFruit(res)
            data.splice(idx,1,res)
        })
    }
    const handleFruitPriceChange = (e) => {
        const idx = data.findIndex(fruit => fruit._id === +id)  
        const editedFruit = {...currFruit, [e.target.name]: e.target.value}
        fruitService.save(editedFruit).then(res => {
            setCurrFruit(res)
            data.splice(idx,1,res)
        })
    }




    return (
        <div className='fruit-details'>
            {currFruit ?
                <div className='form-details' >
                    <TextField type="text" onChange={handleFruitChange} name='title' label={currFruit.title} value={currFruit.title} />
                    <TextField type="number" onChange={handleFruitPriceChange} name='price' label={currFruit.price} value={currFruit.price} />
                    <Button  onClick={() => navigate('/')}> <ArrowBackIcon fontSize='large' /></Button>
                </div> 
                :<p>Not Found</p> 
            }

        </div>
    )
}
