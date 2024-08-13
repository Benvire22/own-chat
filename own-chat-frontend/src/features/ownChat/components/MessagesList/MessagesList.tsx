import React, { useEffect, useRef } from 'react';
import { Message } from '../../../../types';
import MessageItem from './MessageItem/MessageItem';
import { Grid, Typography } from '@mui/material';

interface Props {
  messages: Message[];
  isError: boolean;
}

const MessagesList: React.FC<Props> = ({messages, isError}) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: 'smooth'})
    }
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <Grid
      container
      sx={{
        height: '600px',
        mt: 2,
        overflowY: 'scroll',
        border: '1px solid #ccc',
        p: 1,
    }}
      spacing={1}
    >
      {isError
        ? (
          <Grid item>
            <Typography variant="h3" component="h1" sx={{flexGrow: 1, mb: 3, color: 'red'}}>
              Sorry, "unexpected Error" was occurred!
            </Typography>
          </Grid>)
        : (
          <>
            {messages.map((message) => (
              <Grid
                item
                key={message.id}
                flexGrow={1} sx={{
                width: '100%',
                mt: 2,
              }}>
                <MessageItem
                  author={message.author}
                  message={message.message}
                  datetime={message.datetime}
                />
              </Grid>
            ))}
            <Grid item ref={messagesEndRef} sx={{m: 0}}/>
          </>
        )}
    </Grid>
  );
};

export default MessagesList;