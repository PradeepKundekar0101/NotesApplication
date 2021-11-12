import React from 'react'
import { useContext,useEffect,useState,useRef } from 'react'
import NoteContext from '../context/Notes/noteContext' //Here we Want to use State 
import NotesItem from './NotesItem'
import AddNote from '../components/AddNote'
import { useHistory } from 'react-router'
const Notes = (props) => {
    const context=useContext(NoteContext);
    const {notes,getNotes,updateNote}=context; //Notes Array is Destructed
   
    const ref = useRef(null);
    const closed = useRef(null);

    const history=useHistory();
    useEffect(() => {
        if(localStorage.getItem('token'))
            getNotes();   
        else
            history.push('/login');
             // eslint-disable-next-line
        }, []);
   
    const update=(note)=>    //When Ever User Clicks on the Edit(Pencil) Button the modal is Toggled using USEREF HOOK
    {
        ref.current.click();  //User clicks and Pencil 
    }

    const updateAndCloseModal=()=>{   // WhenEver user clicks on Update Button inside Modal
        updateNote(editForm.noteId,editForm.title,editForm.description,editForm.tag);
        
        closed.current.click(); 
    }

    const [editForm,setEditForm]= useState({noteId:"",title:"",description:"",tag:""})

    const handleInput=(e)=>{
        setEditForm({...editForm,[e.target.name]:e.target.value})
    }
    const token=localStorage.getItem("token");
    return (
        <>
           
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="form">
                        <div className="form-group my-2">
                            <label htmlFor="noteTitle">Title</label>
                            <input type="text" name="title" className="form-control" id="etitle" onChange={handleInput} />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="noteDescription">Description:</label>
                            <input type="text" name="description" className="form-control" id="edescription" onChange={handleInput}/>
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="noteTag">Tag:</label>
                            <input type="text" name="tag" className="form-control" id="etag" onChange={handleInput}/>
                        </div>           
                        {/* <button type="submit" className="btn btn-primary my-3" onClick={handleSubmit}>Add Note</button> */}
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closed}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={updateAndCloseModal}>Update</button>
                    </div>
                    </div>
                </div>
        </div>

          <AddNote showAlert={props.showAlert}/>
          <h2 style={{color:"#292929"}}>
           { notes.length===0? "Add Notes to Preview them here":"Available Notes"}
        </h2>
        <button type="button" className="btn btn-primary d-none " data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">

        </button>
        <div className="row">
            {notes.map((note)=>{
                return <NotesItem key={note._id} note={note} update={update} setEditForm={setEditForm}/>
            })}
        </div>
      
        </>
    )
}

export default Notes
