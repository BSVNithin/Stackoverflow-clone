import express from 'express'

import { commentQuestion, deleteComment ,editComment} from '../controllers/Comments.js' 
import auth from '../middleware/auth.js'
const router = express.Router()
router.patch('/post/:id',auth,commentQuestion);
router.patch('/delete/:id', auth, deleteComment);
router.patch('/edit/:id',auth,editComment);
export default router