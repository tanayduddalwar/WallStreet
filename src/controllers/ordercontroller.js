const prisma = require('../utils/prisma');

exports.addOrder = async (req, res) => {
  try {
    const { order_id, time, order_type, quantity, price, companyId, userId } = req.body;
    const newOrder = await prisma.order.create({
      data: { order_id, time, order_type, quantity, price, companyId, userId },
    });
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};