import Questions from '../models/Questions.js'
import mongoose from 'mongoose'

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
export const editComment = async(req,res) => {
    const { id: _id } = req.params;
    const { commentId, commentBody} = req.body;
    console.log(req.body)
    // console.log(commentBody)
    // console.log('editCommentServer')
    // console.log(_id);
    const userId = req.userId;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }
    try {
        var Question = await Questions.findById(_id);
        console.log(Question)
        for(let i=0;i<Question.comments.length;i++){
            if(Question.comments[i].commentId==commentId){
                Question.comments[i].commentBody=commentBody;
            }
        }
        var o=await Question.save()
        // console.log(o)
        // console.log(Question)
        // console.log('hello')
        // console.log(commentId)
        // console.log(commentBody)
        res.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json('error in updating')
    }
}

export const deleteComment = async ( req, res ) => {
    const { id:_id } = req.params;
    const { commentId, noOfComments } = req.body;
    console.log(_id);
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