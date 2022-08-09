import Questions from '../models/Questions.js'
import mongoose from 'mongoose'

export const AskQuestion = async (req, res) => {
    const postQuestionData = req.body;
    const userId = req.userId;
    const postQuestion = new Questions({ ...postQuestionData, userId});
    try {
        await postQuestion.save();
        res.status(200).json("Posted a question successfully")
    } catch (error) {
        console.log(error)
        res.status(409).json("Couldn't post a new question")        
    }
}

export const getAllQuestions = async (req, res) => {
    try {
        const questionList = await Questions.find();
        res.status(200).json(questionList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
} 

export const deleteQuestion = async (req, res) => {
    const { id:_id } = req.params ;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }

    try {
        await Questions.findByIdAndRemove( _id );
        res.status(200).json({ message: "successfully deleted..."})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const voteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    const { value } = req.body;
    const userId = req.userId;
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }

    try {
        const question = await Questions.findById(_id)
        const upIndex = question.upVote.findIndex((id) => id === String(userId))
        const downIndex = question.downVote.findIndex((id) => id === String(userId))

        if(value === 'upVote'){
            if(downIndex !== -1){
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            } 
            if(upIndex === -1){
                question.upVote.push(userId)
            }else{
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
        }
        else if(value === 'downVote'){
            if(upIndex !== -1){
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            } 
            if(downIndex === -1){
                question.downVote.push(userId)
            }else{
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
        }
        await Questions.findByIdAndUpdate( _id, question )
        res.status(200).json({ message: "voted successfully..."})
    } catch (error) {
        res.status(404).json({ message: "id not found"})
    }
}

export const commentQuestion = async(req, res) => {
    const { id: _id } = req.params;
    const { noOfComments, commentBody, userCommented } = req.body;
    const userId = req.userId;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }
    
    updateNoOfComments(_id, noOfComments)
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate( _id, { $addToSet: {'comments': [{ commentBody, userCommented, userId }]}})
        res.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json('error in updating')
    }
}


export const deleteComment = async ( req, res ) => {
    const { id:_id } = req.params;
    const { commentId, noOfComments } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question unavailable...');
    }
    if(!mongoose.Types.ObjectId.isValid(commentId)){
        return res.status(404).send('Comment unavailable...');
    }
    updateNoOfComments( _id, noOfComments)
    try{
        await Questions.updateOne(
            { _id }, 
            { $pull: { 'comments': { _id: commentId } } }
        )
        res.status(200).json({ message: "Successfully deleted..."})
    }catch(error){
        res.status(405).json(error)
    }
}

const updateNoOfComments = async (_id, noOfComments) => {
    try {
        await Questions.findByIdAndUpdate( _id, { $set: { 'noOfComments' : noOfComments}})
    } catch (error) {
        console.log(error)
    }
}