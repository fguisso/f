import { useEffect, useState } from 'react';
import { Container, Typography, TextField, MenuItem, Button, Stack } from '@mui/material';
import { get, post } from '../api';

interface Category { id: string; name: string; }

export default function AddTransaction() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    date: '',
    description: '',
    type: 'INCOME',
    value: '',
    paymentMethod: 'CARD',
    categoryId: ''
  });

  useEffect(() => {
    get<Category[]>('/categories').then(setCategories).catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await post('/transactions', { ...form, value: parseFloat(form.value) });
    setForm({ date: '', description: '', type: 'INCOME', value: '', paymentMethod: 'CARD', categoryId: '' });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Adicionar Transação</Typography>
      <Stack spacing={2}>
        <TextField label="Data" type="date" name="date" value={form.date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
        <TextField label="Descrição" name="description" value={form.description} onChange={handleChange} />
        <TextField select label="Tipo" name="type" value={form.type} onChange={handleChange}>
          <MenuItem value="INCOME">Entrada</MenuItem>
          <MenuItem value="EXPENSE">Saída</MenuItem>
        </TextField>
        <TextField label="Valor" name="value" value={form.value} onChange={handleChange} type="number" />
        <TextField select label="Pago com" name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
          <MenuItem value="CARD">Cartão</MenuItem>
          <MenuItem value="PIX">PIX</MenuItem>
          <MenuItem value="CASH">Dinheiro</MenuItem>
        </TextField>
        <TextField select label="Categoria" name="categoryId" value={form.categoryId} onChange={handleChange}>
          {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
        </TextField>
        <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
      </Stack>
    </Container>
  );
}
