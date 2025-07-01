import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Routes placeholders
app.get('/transactions', async (req, res) => {
  const transactions = await prisma.transaction.findMany();
  res.json(transactions);
});

app.post('/transactions', async (req, res) => {
  const data = req.body;
  const transaction = await prisma.transaction.create({ data });
  res.json(transaction);
});

app.get('/categories', async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

app.post('/categories', async (req, res) => {
  const category = await prisma.category.create({ data: req.body });
  res.json(category);
});

app.get('/fixed-expenses', async (req, res) => {
  const expenses = await prisma.fixedExpense.findMany();
  res.json(expenses);
});

app.post('/fixed-expenses', async (req, res) => {
  const expense = await prisma.fixedExpense.create({ data: req.body });
  res.json(expense);
});

app.patch('/fixed-expenses/:id', async (req, res) => {
  const { id } = req.params;
  const expense = await prisma.fixedExpense.update({
    where: { id },
    data: { paid: true }
  });
  res.json(expense);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
