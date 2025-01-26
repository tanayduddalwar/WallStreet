const prisma = require('../utils/prisma');
const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.error('Redis error:', err));

exports.processOrders = async (companyId) => {
  const queueName = `orders_queue_${companyId}`;

  setInterval(async () => {
    const orderData = await client.rpop(queueName);
    if (orderData) {
      const order = JSON.parse(orderData);
      console.log(`Processing order: ${order.order_id}`);

      // Process order logic (match, update database, etc.)
      await prisma.order.update({
        where: { order_id: order.order_id },
        data: { ...order },
      });
    }
  }, 2000);
};
