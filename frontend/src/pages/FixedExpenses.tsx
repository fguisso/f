import { useEffect, useState } from 'react';
import { Container, Typography, TextField, MenuItem, Button, Checkbox, Table, TableHead, TableRow, TableCell, TableBody, Stack } from '@mui/material';
import { get, post, patch } from '../api';

interface Category { id: string; name: string; }
interface Expense {
  id: string;
  description: string;
  value: number;
  categoryId: string;
  category: Category;
  paid: boolean;
}

export default function FixedExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ description: '', value: '', categoryId: '' });

  const load = async () => {
    setExpenses(await get<Expense[]>('/fixed-expenses'));
    setCategories(await get<Category[]>('/categories'));
  };

  useEffect(() => { load().catch(console.error); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const add = async () => {
    await post('/fixed-expenses', { ...form, value: parseFloat(form.value) });
    setForm({ description: '', value: '', categoryId: '' });
    load();
  };

  const togglePaid = async (id: string) => {
    await patch(`/fixed-expenses/${id}`, { paid: true });
    load();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Gastos Fixos</Typography>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <TextField label="Descrição" name="description" value={form.description} onChange={handleChange} />
        <TextField label="Valor" name="value" value={form.value} onChange={handleChange} type="number" />
        <TextField select label="Categoria" name="categoryId" value={form.categoryId} onChange={handleChange}>
          {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
        </TextField>
        <Button variant="contained" onClick={add}>Adicionar</Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Pago</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map(e => (
            <TableRow key={e.id}>
              <TableCell>{e.description}</TableCell>
              <TableCell>{e.value}</TableCell>
              <TableCell>{e.category?.name}</TableCell>
              <TableCell>
                <Checkbox checked={e.paid} onChange={() => togglePaid(e.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
