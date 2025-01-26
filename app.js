const express = require('express');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Add an order
app.post('/add_order', async (req, res) => {
  const { order_id, time, order_type, quantity, price, companyId, userId } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        order_id,
        time: new Date(time),
        order_type,
        quantity,
        price,
        companyId,
        userId,
      },
    });

    res.status(200).json({ message: 'Order added successfully', order: newOrder });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ error: 'Failed to add order' });
  }
});

// Fetch orders for a company
app.get('/orders/:companyId', async (req, res) => {
  const { companyId } = req.params;

  try {
    const orders = await prisma.order.findMany({
      where: { companyId: parseInt(companyId) },
      include: { user: true, company: true },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
