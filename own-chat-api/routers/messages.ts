import express from "express";
import fileDb from '../fileDb';
import { MessageFromUser } from '../types';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const messages = await fileDb.getItems();
  res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
  const message: MessageFromUser = {
    author: req.body.description,
    title: req.body.title,
  };
  const saveMessage = await fileDb.addItem(message);

  return res.send(saveMessage);
});

export default messagesRouter;