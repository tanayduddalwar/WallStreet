class MatchingEngine {
    constructor(orderBook) {
      this.orderBook = orderBook;
    }
  
    processOrder(order) {
      
      console.log(`Processing order: ${order.order_id}`);
    }
  }
  module.exports = MatchingEngine;