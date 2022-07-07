import { useEffect, useState } from 'react'
import { toyService } from '../../services/toyService'
import { AxiosPreview } from '../AxiosPreview/AxiosPreview'
import './AxiosList.scss'

export const AxiosList = (props) => {
    const [data, setData] = useState(null)
    const [addUserModal, setUserModal] = useState(false)


    useEffect(() => {
        setData(props.data)
    }, [props.data])

    const delUser = (id) => {
        const idx = data.findIndex(user => user._id === id)
        data.splice(idx, 1)
        setData([...data])
        toyService.remove(id)


    }

    const handleSubmit = (e) => {
        const newToy = { title: document.querySelector('.add-toy').value }
        toyService.save(newToy).then(res => {
            data.push(res)
            setData([...data])
        })
        e.preventDefault()
        document.querySelector('.add-toy').value = ''
    }

    const handleSearch = (e) => {
        toyService.query(e.target.value)
            .then(toys => {
                setData(toys)
            })
            .catch(err => console.log('Error:', err))
    }



    return (
        <div className='axios-list'>
            <div className="filter">
                <input type="text" onChange={handleSearch} placeholder='Search User...' />
            </div>
            <ul>
                {data && data.map(user => <li className='item' key={user._id}><AxiosPreview delUser={delUser} key={user._id} user={user}></AxiosPreview></li>)}
                {addUserModal ? <form onSubmit={handleSubmit} className='item add-user'><input type="text" className='add-toy' placeholder='Enter A Name' /> <button type='submit'>Add</button> <button onClick={(e) => { setUserModal(false); e.preventDefault() }}>Close</button></form> : <li onClick={() => setUserModal(!addUserModal)} className='item'>Add</li>}

            </ul>
        </div>
    )
}