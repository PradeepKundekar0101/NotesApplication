import React,{useContext} from 'react'
import NoteContext from '../context/Notes/noteContext'

const NotesItem = (props) => {
    const {note,update,setEditForm}=props;

    const context = useContext(NoteContext);
    const {getNotes,deleteNote}=context;
    
    const refreshNotes=()=>{
        getNotes();
    }
    const fillDetails=()=>{  // Auto the Initial Values while Updating
        console.log("Filling")
        const title=note.title;
        const description=note.description;
        const tag=note.tag;
        
        const etitle=document.getElementById('etitle');
        const edescription=document.getElementById('edescription');
        const etag=document.getElementById('etag');
        
        etitle.value=title;
        edescription.value=description;
        etag.value=tag;
        // setNoteId(note._id)
        setEditForm({noteId:note._id,title:title,description:description,tag:tag});
    }
   
   
    return (     
        <>
        <div className="col-md-3">
            <div className="card my-3" style={{boxShadow:"0px 2px 5px #000" ,background:"#0005",color:"#fff"}}>
                <div className="card-body">
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <h5 className="card-title">{note.title}</h5>
                    <div>
                 <i className="fas fa-trash-alt  mx-1" style={{color:"tomato"}}onClick={()=>{deleteNote(note._id);refreshNotes()}}></i>
                   <i className="fas fa-edit mx-1" onClick={()=>{fillDetails();update(note)}} ></i>
                    </div>
                </div>
                <p className="card-text">{note.description} </p>
                </div>
                <p style={{textAlign:"right",margin:"5px 10px"}}>{note.tag}</p>
            </div>
        </div>
      </>
    )
}

export default NotesItem
