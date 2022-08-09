import mongoose from 'mongoose'

const QuestionSchema = mongoose.Schema({
    questionTitle: { type: String, required: "Question must have a title"},
    questionBody: { type: String, required: "Question must have a body"},
    questionTags: { type: [String], required: "Question must have a tags"},
    noOfAnswers: { type: Number, default: 0},
    upVote: { type: [String], default: []},
    downVote: { type: [String], default: []},
    noOfComments: {type:Number, default: 0},
    noOfAnsComments: {type:Number, default: 0},
    comments: [{
        commentBody: String,
        userCommented: String,
        userId: String,
        commentId: {type:Number,default:Math.random()},
        commentedOn: {type: Date,default: Date.now},
    }],
    userPosted: { type: String, required: "Question must have an author"},
    userId: { type: String},
    askedOn: { type: Date, default: Date.now},
    answer: [{
        answerBody: String,
        userAnswered: String,
        userId: String,
        answeredOn: { type: Date, default: Date.now},
    }],
    answercomments: [{
        anscommentBody: String,
        ansuserCommented: String,
        ansuserId: String,
        anscommentId: {type:Number,default:Math.random()},
        anscommentedOn: {type: Date,default: Date.now},
    }],
})

export default mongoose.model("Question", QuestionSchema)