import React from 'react';
import { Grid, Card, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { lightBlue } from '@mui/material/colors';
import dayjs from 'dayjs';

interface Props {
  author: string;
  message: string;
  datetime: string;
}

const MessageItem: React.FC<Props> = ({author, message, datetime}) => {
  return (
  <Grid item>
    <Card variant="outlined">
      <CardContent>
        <Typography borderBottom="1px solid #ccc" marginBottom="10px" paddingBottom="7px">
          <Typography variant="h6" color={lightBlue[900]} marginRight="10px" component="span">{author}.</Typography>
          <Typography variant="h6" color="teal" component="span">{dayjs(datetime).format('DD.MM.YYYY HH:mm')}</Typography>
        </Typography>
        <Typography variant="body1">
          {message}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
  );
};

export default MessageItem;