import express from "express";
import fileDb from '../fileDb';
import { MessageFromUser } from '../types';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const queryDate = req.query.datetime as string;
  const date = new Date(queryDate);

  if (isNaN(date.getDate())) {
    const messages = await fileDb.getItems();
    res.send(JSON.stringify(messages));
  } else {
    const messages = await fileDb.getItems();
    const newMessages = messages.filter((message) => {
      const messageDate = new Date(message.datetime);
      if (messageDate > date) {
        return message;
      }
    });

    res.send(JSON.stringify(newMessages));
  }
});

messagesRouter.post('/', async (req, res) => {
  if (req.body.author !== '' && req.body.message !== '') {
    const message: MessageFromUser = {
      author: req.body.author,
      message: req.body.message,
    };
    const saveMessage = await fileDb.addItem(message);

    return res.send(saveMessage);
  } else {
    const error = {
      error: 'Author and message must be present in the request'
    };

    res.status(400).send(error);
  }
});

export default messagesRouter;