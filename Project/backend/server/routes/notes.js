const express=require('express');
const { body, validationResult } = require('express-validator');
const fetchuser=require('../../middlewares/fetchuser');
const Note=require('../../db/models/NotesSchema');

const router=express.Router();


// Route 1: Get all Notes of Particular User using his ID which was Extracted from Token provided in Header
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    const notes=await Note.find({user: req.user.id})   //Get all notes corresponding to Provided User Id
    res.json(notes);
})

// Route 2: Add a New note ..Authentication needed Note is Added to that where the Id is Mentioned
router.post('/addnote',fetchuser,
    [ 
        body('title','Enter A Valid Title').isLength({min:3}),
        body('description','Description  must be 5 Characters Long').isLength({ min: 5 })
    ],
    async (req,res)=>
    {
        console.log("Inside Async Function")
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user_id=req.user.id;
        
        const {title,description,tag}=req.body;
        const newNote= new Note({
            title,description,tag,user:user_id
        })
        const savedUser=await newNote.save();
        res.send(savedUser)
    } catch (error) {
        console.log(error)
    }
})
// Route3 : Update the Existing note provided by a Id : PUT /notes/updatenote:id
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}=req.body;
    try {
        const noteId=req.params.id;
        const userId=req.user.id;
        // console.log("Note Id:"+noteId);
        // console.log("User Id"+userId);
        const newNote={};
        if(title) //If Title is Coming as a Part Req than Update Title
        {newNote.title=title;}
    
        if(description) //If Description is Coming as a Part Req than Update Description
        {newNote.description=description;}
        
        if(tag) //If Tag is Coming as a Part Req than Update Tag
        {newNote.tag=tag;}
        
        let note=await Note.findById(noteId);
        if(!note){
            return res.status(404).send("Note Not Found");
        }
        console.log("Note User Id:"+note.user)
        if(userId.toString() !== note.user.toString())
        {
            return res.status(401).json({error:"Unable to Modify the Notes"});
        }
        note=await Note.findByIdAndUpdate(noteId,{$set:newNote},{new:true});
        res.send(note)
        
    } catch (error) {
        res.status(500).send("ErrorInternal Server Error");
        console.log(error)  
    }
})
//Route 4: Delete Note : Delete : notes/deletenote:id
router.delete('/delete/:id',fetchuser,async (req,res)=>{
    
    try{
        const userid=req.user.id;
        const noteid=req.params.id;
        console.log("Recieved to Delete "+noteid+"From Frontend");
        let note=await Note.findById(noteid);
        if(!note)
        {
            res.status(404).send("Note not Found");
        }
        if(note.user.toString()!==userid)
        {
            res.status(401).send("Not allowed to Delete the Note");
        }
        note=await Note.findByIdAndDelete(noteid);
        console.log("Note Deleted"+note)
        // res.json("Note Deleted Successfully");
    }catch(err){
        console.log(err);
    }
})
module.exports=router;
