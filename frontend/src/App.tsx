import { AppBar, Toolbar, Typography, Container, Button, Stack } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import Categories from './pages/Categories';
import FixedExpenses from './pages/FixedExpenses';

export default function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Finance App</Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" component={Link} to="/">Dashboard</Button>
            <Button color="inherit" component={Link} to="/add">Adicionar</Button>
            <Button color="inherit" component={Link} to="/categories">Categorias</Button>
            <Button color="inherit" component={Link} to="/fixed">Gastos Fixos</Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/fixed" element={<FixedExpenses />} />
        </Routes>
      </Container>
    </Router>
  );
}
