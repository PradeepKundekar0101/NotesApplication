import React,{useState,useContext} from 'react'
import NoteContext from '../context/Notes/noteContext';
import '../App.css';
const AddNote = (props) => {
    const context = useContext(NoteContext);
 
    const {addNote}=context;    
    
    const [note, setNote] = useState({title:"",description:"",tag:""});
    
    const handleInput=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        console.log(note.title,note.description,note.tag)
        e.preventDefault();   //Prevent the Default Behaviour of Form 
        addNote(note.title,note.description,note.tag);  //Call the function to Add a Note Which is Defined in Context
        
        clearForm();
        props.showAlert("Notes Added Successfuly","success");
        
    }
    const clearForm=()=>
    {
        const title=document.getElementById('noteTitle');
        const desc=document.getElementById('noteDescription');
        const tag=document.getElementById('noteTag');
        title.value="";
        desc.value="";
        tag.value="";
        setNote({title:"",description:"",tag:""})
    }
    return (
        <div style={{color:"#292929"}}>
             <h2>
                Add Notes
           </h2>
           <form id="form" className="addNote">
            <div className="form-group my-2">
                <label htmlFor="noteTitle">Title:</label>
                <input type="text" name="title"  className="form-control" id="noteTitle" onChange={handleInput} />
            </div>
            <div className="form-group my-2">
                <label htmlFor="noteDescription">Description:</label>
                <input type="text" name="description" className="form-control" id="noteDescription" onChange={handleInput}/>
            </div>
            <div className="form-group my-2">
                <label htmlFor="noteTag">Tag:</label>
                <input type="text" name="tag" className="form-control" id="noteTag" onChange={handleInput}/>
            </div>           
            <button type="submit" disabled={note.title.length<5||note.description.length<5} className="btn btn-primary my-3" onClick={handleSubmit}>Add Note</button>
        </form>
        </div>
    )
}

export default AddNote
