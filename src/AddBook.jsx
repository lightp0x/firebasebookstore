// AddBook.jsx
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

const initialBook = {
  title: '',
  author: '',
  year: '',
  isbn: '',
  price: '',
};

function AddBook({ addBook }) {
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState(initialBook);

  const handleOpen = () => {
    setBook(initialBook);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addBook(book);
    handleClose();
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setBook(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{
          alignSelf: { xs: 'center', sm: 'flex-start' },
          px: 4,
          fontWeight: 600,
          borderColor: '#4db6ac',
          color: '#4db6ac',
          '&:hover': {
            borderColor: '#429e97',
            backgroundColor: 'rgba(77, 182, 172, 0.12)',
          },
        }}
      >
        Add book
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>New book</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              name="title"
              label="Title"
              value={book.title}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="author"
              label="Author"
              value={book.author}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="year"
              label="Publication year"
              value={book.year}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="isbn"
              label="ISBN"
              value={book.isbn}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="price"
              label="Price"
              value={book.price}
              onChange={handleChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddBook;
