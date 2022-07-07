import { AxiosList } from '../../cmps/AxiosList/AxiosList'

import './AxiosApp.scss'

export const AxiosApp = (props) => {
    const { data } = props


    return (
        <div className='app'>
            {data ? <AxiosList  data={data}> </AxiosList> : <p>Loading</p>}
        </div>
    )
}

// db.todo_list.insertMany([{"title": "fix that"}, {"title": "fix it"}])
