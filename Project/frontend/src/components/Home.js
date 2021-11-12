import React from 'react'
import Notes from '../components/Notes';


const Home = (props) => {
    
    return (
        <div className="container my-3">
            <div className="container">
                <Notes showAlert={props.showAlert}/>
            </div>
        </div>
    )
}

export default Home
