import { FruitList } from '../../cmps/FruitList/FruitList'

import './FruitApp.scss'

export const FruitApp = (props) => {
    const { data } = props


    return (
        <div className='app'>
            {data ? <FruitList  data={data}> </FruitList> : <p>Loading</p>}
        </div>
    )
}

// db.todo_list.insertMany([{"title": "fix that"}, {"title": "fix it"}])
