import { selectCarts, selectuser } from "@/redux/cartSlice";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

function Address({ onCancel, total }) {
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();
  let user = useSelector(selectuser);
  let cart = useSelector(selectCarts);

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
  // http://localhost:3000/_next/image?url=%2Fassets%2Fimg%2Fmenu%2Fimage6.jpg&w=128&q=75
  // http://localhost:3000/_next/image?url=%2Fassets%2Fimg%2Fmenu%2Fimage1.jpg&w=128&q=75
  const createCheckOutSession = async () => {
    let item = {
      name: "Yummy",
      image:
        "https://images.unsplash.com/photo-1604259597308-5321e8e4789c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHw%3D&w=1000&q=80",
      // image: `http://localhost:3000/_next/image?url=%2Fassets%2Fimg%2Fmenu%2F${cart[0].image}&w=128&q=75`,
      quantity: cart[0].qty,
      price: total,
      id: user._id,
      product: cart,
    };
    setloading(true);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-stripe-session", {
      item: item,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
    setloading(false);
  };
  const onSubmit = async (values) => {
    setloading(true);
    try {
      let response = await fetch(
        "http://localhost:3000/api/update-profile?id=" + user._id,
        {
          method: "POST",
          body: JSON.stringify({
            ...values,
          }),
          // headers: {
          //   Accept: "application/json, text/plain, */*",
          //   "Content-Type": "application/json",
          // },
        }
      );
      response = await response.json();

      if (response?.success) {
        form.resetFields();
        createCheckOutSession();
        onCancel();
      }
    } catch (errorMessage) {
      console.log(errorMessage);
    }
    setloading(false);
  };
  return (
    <Form form={form} onFinish={onSubmit}>
      <label className="form-label" for="form3Example3cg">
        Complete address
      </label>
      <Form.Item
        name="address"
        id="address"
        className="form-outline mb-4"
        // label="Name"
        rules={[
          {
            message: " Complete address is required",
            required: true,
          },
        ]}
      >
        <Input className="form-control form-control-lg" />
      </Form.Item>{" "}
      <label className="form-label" for="form3Example3cg">
        Floor(optional)
      </label>
      <Form.Item name="floor" id="floor" className="form-outline mb-4">
        <Input className="form-control form-control-lg" />
      </Form.Item>
      <label className="form-label" for="form3Example4cg">
        Nearby landmark (optional)
      </label>
      <Form.Item name="landmark" id="landmark" className="form-outline mb-4">
        <Input className="form-control form-control-lg" />
      </Form.Item>
      <Form.Item className="d-flex justify-content-center">
        {" "}
        <Button
          className="btn btn-danger p-2 me-4"
          style={{ width: "140px" }}
          htmlType="submit"
          loading={loading}
          size="large"
        >
          Add Address
        </Button>
        <Button
          className="btn btn-secondary  p-2 "
          style={{ width: "140px" }}
          onClick={onCancel}
          size="large"
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Address;
