import express from 'express';
import { getContactByName, getContacts } from '../controllers/contacts.controller';

const router = express.Router();

//localhost:3000/api/v1/contacts/jacuno
router.get('/', getContacts);
router.get('/:name', getContactByName);

export default router;