import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';

interface Props {
  onSubmit: (author: string, message: string) => void;
}

interface FormData {
  author: string;
  message: string;
}

const SendForm: React.FC<Props> = ({onSubmit}) => {
  const [formData, setFormData] = useState<FormData>({
    author: '',
    message: '',
  });

  const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData.author, formData.message);
    setFormData(prevState => ({
      ...prevState,
      message: '',
    }));
  };

  const changeFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Form onSubmit={sendForm}>
      <div className="border p-3">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={formData.author}
            name="author"
            id="author"
            placeholder="Author name"
            onChange={changeFormData}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex align-items-center gap-4">
          <Form.Control
            as="textarea"
            value={formData.message}
            name="message"
            id="message"
            rows={3}
            onChange={changeFormData}
            placeholder="Enter some message..."
            required
          />
          <Button type="submit" className="fs-4 px-4 fw-bold">Send</Button>
        </Form.Group>
      </div>
    </Form>
  );
};

export default SendForm;