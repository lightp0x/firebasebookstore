// App.jsx
import { useState, useEffect, useCallback, useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBook from './AddBook';
import './App.css';

const FIREBASE_BASE_URL = 'https://bookstore-c682a-default-rtdb.europe-west1.firebasedatabase.app/books';
const DISPLAY_COLUMNS = [
  { id: 'title', label: 'Title' },
  { id: 'author', label: 'Author' },
  { id: 'year', label: 'Year' },
  { id: 'isbn', label: 'Isbn' },
  { id: 'price', label: 'Price' },
];

const COLORS = {
  background: '#0f1c2b',
  panel: '#1b2a38',
  accent: '#4db6ac',
  accentHover: '#429e97',
  appBar: '#152433',
  textPrimary: '#e2f1f1',
  muted: '#9fb4c4',
  danger: '#ff5c8d',
};

function App() {
  const [books, setBooks] = useState([]);
  const [orderBy, setOrderBy] = useState('title');
  const [order, setOrder] = useState('asc');
  const [filterText, setFilterText] = useState('');

  const fetchBooks = useCallback(() => {
    fetch(`${FIREBASE_BASE_URL}.json`)
      .then(response => response.json())
      .then(data => {
        if (!data) {
          setBooks([]);
          return;
        }
        const withIds = Object.entries(data).map(([id, book]) => ({ ...book, id }));
        setBooks(withIds);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addBook = useCallback(
    newBook => {
      fetch(`${FIREBASE_BASE_URL}.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add book');
          }
          fetchBooks();
        })
        .catch(error => console.error(error));
    },
    [fetchBooks],
  );

  const deleteBook = useCallback(
    id => {
      fetch(`${FIREBASE_BASE_URL}/${id}.json`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete book');
          }
          fetchBooks();
        })
        .catch(error => console.error(error));
    },
    [fetchBooks],
  );

  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredBooks = useMemo(() => {
    const query = filterText.trim().toLowerCase();
    if (!query) {
      return books;
    }
    return books.filter(book =>
      DISPLAY_COLUMNS.some(column =>
        String(book[column.id] ?? '')
          .toLowerCase()
          .includes(query),
      ),
    );
  }, [books, filterText]);

  const sortedBooks = useMemo(() => {
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    return [...filteredBooks].sort((a, b) => {
      const left = a[orderBy] ?? '';
      const right = b[orderBy] ?? '';
      const comparison = collator.compare(left, right);
      return order === 'asc' ? comparison : -comparison;
    });
  }, [filteredBooks, order, orderBy]);

  return (
    <Box sx={{ minHeight: '100vh', background: COLORS.background, color: COLORS.textPrimary }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: COLORS.appBar,
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.45)',
        }}
      >
        <Toolbar sx={{ minHeight: 88 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 500, letterSpacing: 1 }}>
            Bookstore
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: '0 24px 40px rgba(5, 8, 12, 0.45)',
            backgroundColor: COLORS.panel,
            color: COLORS.textPrimary,
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'stretch', sm: 'center' }}
            spacing={2}
            sx={{ mb: 3 }}
          >
            <AddBook addBook={addBook} />
            <TextField
              label="Search"
              size="small"
              value={filterText}
              onChange={event => setFilterText(event.target.value)}
              InputLabelProps={{ sx: { color: COLORS.muted } }}
              InputProps={{
                sx: {
                  color: COLORS.textPrimary,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.muted },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.accent },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.accent },
                },
              }}
            />
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {DISPLAY_COLUMNS.map(column => (
                    <TableCell
                      key={column.id}
                      sx={{ color: COLORS.muted, fontWeight: 600, borderBottomColor: '#22354a' }}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={() => handleRequestSort(column.id)}
                        sx={{
                          '&.Mui-active': { color: COLORS.accent },
                          '& .MuiTableSortLabel-icon': { color: COLORS.accent },
                        }}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell sx={{ borderBottomColor: '#22354a' }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedBooks.map(book => (
                  <TableRow
                    key={book.id}
                    hover
                    sx={{
                      '&:hover': { backgroundColor: '#213245' },
                    }}
                  >
                    {DISPLAY_COLUMNS.map(column => (
                      <TableCell
                        key={column.id}
                        sx={{
                          color: COLORS.textPrimary,
                          borderBottomColor: '#22354a',
                        }}
                      >
                        {book[column.id]}
                      </TableCell>
                    ))}
                    <TableCell align="center" sx={{ borderBottomColor: '#22354a' }}>
                      <IconButton onClick={() => deleteBook(book.id)} sx={{ color: COLORS.danger }}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
