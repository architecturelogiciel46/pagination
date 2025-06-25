import express from 'express';
import cors from 'cors';
import { supabase } from './utils/supabase.js';

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.get('/productspage', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    const { data, count, error } = await supabase
      .from('products')
      .select('*', { count: 'exact' }) // total count
      .range(from, to);

    if (error) throw error;

    res.json({
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur pagination', detail: err.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Product service is running at http://localhost:${port}`);
});
