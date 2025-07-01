import { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, Stack } from '@mui/material';
import { get, post } from '../api';

interface Category { id: string; name: string; }

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');

  const load = () => get<Category[]>('/categories').then(setCategories);

  useEffect(() => { load().catch(console.error); }, []);

  const add = async () => {
    await post('/categories', { name });
    setName('');
    load();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Categorias</Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField label="Nome" value={name} onChange={e => setName(e.target.value)} />
        <Button variant="contained" onClick={add}>Adicionar</Button>
      </Stack>
      <List>
        {categories.map(c => (
          <ListItem key={c.id}>
            <ListItemText primary={c.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
