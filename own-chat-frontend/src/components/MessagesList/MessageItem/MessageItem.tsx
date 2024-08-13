import React from 'react';
import {Card} from 'react-bootstrap';

interface Props {
  author: string;
  message: string;
  datetime: string;
}

const MessageItem: React.FC<Props> = ({author, message, datetime}) => {
  const date = new Date(datetime),
    dFormat = [
          date.getDate(),
          date.getMonth()+1,
          date.getFullYear()].join('.') + ' ' +
        [date.getHours(),
          date.getMinutes(),
          date.getSeconds()].join(':');

  return (
  <Card className="mb-3">
    <Card.Header><span className="text-primary fw-semibold">{author}</span>. <span className="text-success" >{dFormat}</span></Card.Header>
    <Card.Body>
      <Card.Title>{message}</Card.Title>
    </Card.Body>
  </Card>
  );
};

export default MessageItem;