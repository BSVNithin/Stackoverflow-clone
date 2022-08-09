import Questions from '../models/Questions.js'
import mongoose from 'mongoose'

export const commentAnswer = async(req, res) => {
    const { id: _id } = req.params;
    const { noOfAnsComments, anscommentBody, ansuserCommented } = req.body;
    const ansuserId = req.userId;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }
    updateNoOfComments(_id, noOfAnsComments)
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate( _id, { $addToSet: {'answercomments': [{ anscommentBody, ansuserCommented, ansuserId }]}})
        res.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json('error in updating')
    }
}


export const deleteCommentans = async ( req, res ) => {
    const { id:_id } = req.params;
    const { anscommentId, noOfAnsComments } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question unavailable...');
    }
    if(!mongoose.Types.ObjectId.isValid(anscommentId)){
        return res.status(404).send('Comment unavailable...');
    }
    updateNoOfComments( _id, noOfAnsComments)
    try{
        await Questions.updateOne(
            { _id }, 
            { $pull: { 'answercomments': { _id: anscommentId } } }
        )
        res.status(200).json({ message: "Successfully deleted..."})
    }catch(error){
        res.status(405).json(error)
    }
}

export const editCommentans = async(req,res) => {
    const { id: _id } = req.params;
    const { anscommentId, anscommentBody} = req.body;
    console.log(req.body)
    const userId = req.userId;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }
    try {
        var Question = await Questions.findById(_id);
        console.log(Question)
        for(let i=0;i<Question.answercomments.length;i++){
            if(Question.answercomments[i].anscommentId==anscommentId){
                Question.answercomments[i].anscommentBody=anscommentBody;
            }
        }
        var o=await Question.save()
        // console.log(o);
        res.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json('error in updating')
    }
}

const updateNoOfComments = async (_id, noOfAnsComments) => {
    try {
        await Questions.findByIdAndUpdate( _id, { $set: { 'noOfAnsComments' : noOfAnsComments}})
    } catch (error) {
        console.log(error)
    }
}