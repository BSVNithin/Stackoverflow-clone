import express from 'express'

import { commentAnswer, deleteCommentans, editCommentans } from '../controllers/CommentsAns.js' 
import auth from '../middleware/auth.js'
const router = express.Router()
router.patch('/post/:id',auth,commentAnswer);
router.patch('/delete/:id', auth, deleteCommentans);
router.patch('/edit/:id',auth,editCommentans);
export default router