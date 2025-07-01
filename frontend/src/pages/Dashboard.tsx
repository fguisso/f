import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { get } from '../api';

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'INCOME' | 'EXPENSE';
  value: number;
  paymentMethod: 'CARD' | 'PIX' | 'CASH';
  categoryId: string;
  category: { id: string; name: string };
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    get<Transaction[]>('/transactions').then(setTransactions).catch(console.error);
  }, []);

  const income = transactions.filter(t => t.type === 'INCOME').reduce((sum, t) => sum + Number(t.value), 0);
  const expense = transactions.filter(t => t.type === 'EXPENSE').reduce((sum, t) => sum + Number(t.value), 0);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Typography>Total Entradas: {income}</Typography>
      <Typography>Total Saídas: {expense}</Typography>
      <Typography>Saldo: {income - expense}</Typography>
      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Método</TableCell>
            <TableCell>Categoria</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(t => (
            <TableRow key={t.id}>
              <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
              <TableCell>{t.description}</TableCell>
              <TableCell>{t.type}</TableCell>
              <TableCell>{t.value}</TableCell>
              <TableCell>{t.paymentMethod}</TableCell>
              <TableCell>{t.category?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
