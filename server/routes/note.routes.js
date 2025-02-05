import express from 'express';
const router = express.Router({mergeParams:true});
import {getNotes,setNotes} from '../controllers/notes.controller.js';


router.get('/',getNotes);
router.post('/',setNotes);

export default router;