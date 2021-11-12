import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
   // const host="http://localhost:5000"
    const initialNotes=[];
    const [notes, setNotes] = useState(initialNotes);
    //Get all Notes
    const getNotes=async()=>{
      console.log("fetching Notes from DB")  
      const response = await fetch("http://localhost:5000/notes/fetchallnotes", {
          method: 'GET', 
          headers:
          {
              'Content-Type': 'application/json',
              'auth_token':localStorage.getItem('token')
          }
          });
          const json=await response.json();
          console.log(json)
          setNotes(json);
        
    }
    
    
    //Adding a New Note
    const addNote=async(title,description,tag)=>{
        console.log(`Adding with Following Details:${title,description,tag}`)
       const response=await fetch('http://localhost:5000/notes/addnote',{
        method: 'POST', 
        headers:
        {
            'Content-Type': 'application/json',
            'auth_token':localStorage.getItem("token")
        },
        body: JSON.stringify({title,description,tag})
      });
      const data=await response.json();
      console.log(data)
      setNotes(notes.concat(data));
    }
    //Delete Note
    const deleteNote=async (id)=>
    {
        console.log(`Deleting Note ${id}`)
        const response = await fetch(`http://localhost:5000/notes/delete/${id}`,
        {
          method: 'DELETE', 
      
          headers:
          {
              'Content-Type': 'application/json',
              'auth_token':localStorage.getItem('token')              
          }
        });
          const json=await response.json();
          console.log(json);
          
          // setNotes(json);    
        //  setNotes(notes.filter((note)=>{if(note._id!=id) return note;}))
      }
    const updateNote=async (id,title,description,tag)=>{
        console.log(`editing Notes with Initial Values: ${id} ${title} ${description} ${tag}`);
        let newNote;
        for (let index = 0; index <= notes.length; index++) //Linear Search for Finding note with Specified ID
        {
            if(notes[index]._id===id)
            {
              console.log(notes[index])
              notes[index].title=title;
              notes[index].description=description;
              notes[index].tag=tag;
              console.log("After Updating the note is title:"+ notes[index].title+"Description:"+notes[index].description); 
              newNote={
                title:notes[index].title,
                description:notes[index].description,
                tag:notes[index].tag
              }
              break;
            }

        }

        const response = await fetch(`http://localhost:5000/notes/updatenote/${id}`,
        {
          method: 'PUT', 
          headers:
          {
              'Content-Type': 'application/json',
              'auth_token':localStorage.getItem('token'),
              
          },
          body: JSON.stringify(newNote)
        });
        refreshNotes();
          const json=await response.json();
          console.log(json);
    }
    const refreshNotes=()=>
    {
      getNotes();
    }

    return (
        <NoteContext.Provider value={{notes,getNotes,refreshNotes,addNote,deleteNote,updateNote}}>{props.children}</NoteContext.Provider>
    );
}
export default NoteState;