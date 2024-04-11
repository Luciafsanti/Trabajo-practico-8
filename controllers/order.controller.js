const Order = require("../models").oders;
const OrderDetail = require("../models").oder_detail;

async function getAllOrders(req, res){
    const orders = await Order.findAll();
    res.json(orders);
}

async function getOrderById(req, res){
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
}

async function getOrderDetail(req, res){
    const { orderId } = req.params;
    const orderDetail = await OrderDetail.findByPk(orderId);
    if (!orderDetail) {
        return res.status(404).json({ message: "OrderDetail not found" });
    }
    res.json(orderDetail);
}

const newOrderDetail = async (req, res, next) => {
    const { orderDetail } = req.body;
    const newOrderDetail = await OrderDetail.create({ orderDetail });
    res.json(newOrderDetail);        
}

async function createOrder(req, res){
    const { order } = req.body;
    const newOrder = await Order.create({ order });
    res.json(newOrder);

}

