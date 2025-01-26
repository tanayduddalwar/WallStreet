const express = require('express');
const { PrismaClient } = require('@prisma/client'); // Import Prisma Client
const bodyParser = require('body-parser');

const prisma = new PrismaClient(); // Initialize Prisma Client

const app = express();
app.use(bodyParser.json());

app.post('/add_order', async (req, res) => {
  const { order_id, time, order_type, quantity, price, companyId, userId } = req.body;

  try {
    // Ensure companyId and userId are valid integers
    const companyIdNum = parseInt(companyId, 10);
    const userIdNum = parseInt(userId, 10);

    if (isNaN(companyIdNum) || isNaN(userIdNum)) {
      return res.status(400).json({ error: 'Invalid companyId or userId' });
    }

    // Log values for debugging
    console.log('companyId:', companyIdNum);
    console.log('userId:', userIdNum);

    // Check if the company exists
    const company = await prisma.company.findUnique({
      where: {
        id: companyIdNum, // Ensure companyId is used here
      },
    });

    if (!company) {
      return res.status(400).json({ error: 'Company not found' });
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userIdNum }, // Ensure userId is used here
    });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Create the order
    const newOrder = await prisma.order.create({
      data: {
        order_id,
        time: new Date(time),
        order_type,
        quantity,
        price,
        companyId: companyIdNum,
        userId: userIdNum,
      },
    });

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to add order', details: error.message });
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
