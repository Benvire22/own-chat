import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { UserMessage } from '../../../../types';

interface Props {
  onSubmit: (message: UserMessage) => void;
}

const SendForm: React.FC<Props> = ({onSubmit}) => {
  const [formData, setFormData] = useState<UserMessage>({
    author: '',
    message: '',
  });

  const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      author: formData.author,
      message: formData.message,
    });

    setFormData(prevState => ({
      ...prevState,
      message: '',
    }));
  };

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Grid container component="form" spacing={2} sx={{pt: 5}} direction="column" onSubmit={sendForm}>
      <Grid item>
        <TextField
          label="Author"
          value={formData.author}
          onChange={onFieldChange}
          sx={{width: '90%', mr: 2}}
          name="author"
          id="author"
          required
        />
      </Grid>
      <Grid item justifyContent="between">
        <TextField
          multiline
          minRows={4}
          label="Message"
          value={formData.message}
          onChange={onFieldChange}
          sx={{width: '90%', mr: 2}}
          name="message"
          id="message"
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{mt: '12px', p: 4}}
        >
          <SendIcon sx={{fontSize: 35}}/>
        </Button>
      </Grid>
    </Grid>
  );
};

export default SendForm;