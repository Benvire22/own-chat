import { useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { Message, UserMessage } from '../../types';
import MessagesList from './components/MessagesList/MessagesList';
import SendForm from './components/SendForm/SendForm';
import axiosApi from '../../axiosApi';

const OwnChat = () => {
  const [messagesData, setMessagesData] = useState<Message[]>([]);
  const [currentInterval, setCurrentInterval] = useState<boolean>(true);
  const [lastDate, setLastDate] = useState('');
  const [error, setError] = useState<boolean>(false);

  const handleError = (e: Error) => {
    console.error('Error: ', e);
    setError(true);
  };

  const fetchMessages = useCallback(async () => {
    try {
      const {data: messages} = await axiosApi.get<Message[] | null>(`/messages?datetime=${lastDate}`);
      if (messages) {
        if (messagesData.length === 0) {
          setMessagesData(messages);

          if (messages[messages.length - 1].datetime && messages[messages.length - 1].datetime !== lastDate) {
            setLastDate(messages[messages.length - 1].datetime);
          }

        } else if (messages.length > 0) {
          setMessagesData(prevState => [...prevState, ...messages]);

          if (messages[messages.length - 1].datetime !== lastDate) {
            setLastDate(messages[messages.length - 1].datetime);
          }
        }
      }
    } catch (e) {
      handleError(e as Error);
    }
  }, [lastDate]);

  useEffect(() => {
    void fetchMessages().catch(handleError);
  }, [fetchMessages]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        setError(false);
        void fetchMessages();
      } catch (e) {
        clearInterval(interval);
        handleError(e as Error);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [currentInterval, lastDate, messagesData.length]);

  const setMessage = async (message: UserMessage) => {
    setCurrentInterval(prevState => !prevState);
    await axiosApi.post('/messages', message);
  };

  return (
    <Container maxWidth="xl" component="main">
      <MessagesList messages={messagesData} isError={error}/>
      <SendForm onSubmit={setMessage}/>
    </Container>
  );
};

export default OwnChat;