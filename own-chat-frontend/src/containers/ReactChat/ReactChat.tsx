import {useEffect, useState} from 'react';
import {Message} from '../../types';
import MessagesList from '../../components/MessagesList/MessagesList';
import SendForm from '../../components/SendForm/SendForm';
import axiosApi from '../../axiosApi';

const ReactChat = () => {
  const [messagesData, setMessagesData] = useState<Message[]>([]);
  const [lastDate, setLastDate] = useState('');
  const [currentInterval, setCurrentInterval] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      setError(false);
      const fetchRequest = async () => {
        try {
          const {data: messages} = await axiosApi.get<Message[]>(`/messages?datetime=${lastDate}`);

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
          const result = (e as Error).message;
          clearInterval(interval);
          console.error('Error: ', result);
          setError(true);
        }
      };

      void fetchRequest();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [currentInterval, lastDate, messagesData.length]);

  const setMessage = async (author: string, message: string) => {
    setCurrentInterval(prevState => !prevState);

    const data = {
      author,
      message,
    };

    await axiosApi.post('messages', data);
  };

  return (
    <div className="ReactChat container-xl py-3">
      <MessagesList messages={messagesData} isError={error}/>
      <SendForm onSubmit={setMessage}/>
    </div>
  );
};

export default ReactChat;