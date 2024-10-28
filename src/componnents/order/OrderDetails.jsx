import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Card } from "../../components/ui/card";

function OrderDetails() {
  const prams = useParams();
  const orders = useSelector((state) => state.orders);
  const order = orders.find((order) => order._id === prams.orderID);
  console.log(order);
  return (
    <div>
      <div>
        <Card className="text-[15px] p-5 flex gap-[30px]">
          <div>
            <h3>Customer Details</h3>

            <p>Name : {order.name}</p>
            <p>Email : {order.email}</p>
          </div>

          <div>
            <h3>Delivery Address</h3>

            <p>Address : {order.address}</p>
            <p>Email : {order.zipCode}</p>
          </div>
        </Card>
      </div>
      <div></div>
      <h1>Order Details</h1>
      <p>Order ID: {order._id}</p>

      <p>Total Price: ${order.totalPrice}</p>
      <p>Payment Method: {order.paymentMethod}</p>
      <p>Status: {order.status}</p>
      <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
      <p>Products:</p>
      {order.products.map((product, index) => (
        <div key={index}>
          <p>Product ID: {product._id}</p>
          <p>Product Name: {product.name}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderDetails;
