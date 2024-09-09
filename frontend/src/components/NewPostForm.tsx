import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface NewPostFormProps {
  onSubmit: (title: string, body: string, author: string) => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onSubmit(title, body, author);
    setTitle('');
    setAuthor('');
    setEditorState(EditorState.createEmpty());
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        margin="normal"
      />
      <Box sx={{ mb: 2, border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Submit Post
      </Button>
    </Box>
  );
};

export default NewPostForm;
