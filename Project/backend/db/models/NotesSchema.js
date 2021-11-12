const mongoose=require('mongoose');

const notesSchema=mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true,
    },
    tag:{
        type:String,
        default:"General",

    },
    time:{
        type:Date,
        default:Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
const Note=mongoose.model('Notes',notesSchema);
module.exports=Note;