import express from 'express';
import fileDb from '../fileDb';
import { MessageFromUser } from '../types';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const queryDate = req.query.datetime as string;
  const date = new Date(queryDate);

  if (queryDate === '') {
    const messages = await fileDb.getItems();

    return res.send(messages);
  } else if (!isNaN(date.getDate())) {
    const messages = await fileDb.getItems();

    const newMessages = messages.filter((message) => {
      const messageDate = new Date(message.datetime);

      if (messageDate > date) {
        return message;
      }
    });

    return res.send(newMessages);
  }

  if (isNaN(date.getDate())) {
    const error = {
      error: 'datetime value specified in the request is invalid!',
    };

    return res.status(400).send(error);
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
      error: 'Author and message must be present in the request!'
    };

    return res.status(400).send(error);
  }
});

export default messagesRouter;