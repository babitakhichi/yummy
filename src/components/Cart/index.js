import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addCart, deleteCart, selectCarts } from "@/redux/cartSlice";
import { Button, Modal } from "antd";
import Address from "../Address";
import EmptyCart from "../EmptyCart";

function Cart() {
  const dispatch = useDispatch();
  let cart = useSelector(selectCarts);
  const [cartData, setcartData] = useState(cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddress, setIsAddress] = useState(false);

  const [id, setId] = useState();
  const showAddressModal = () => {
    setIsAddress(true);
  };

  const handleAddressCancel = () => {
    setIsAddress(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    try {
      handleDeleteCart();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setcartData(cart);
  }, [cart]);

  const increment = (item) => {
    setcartData(
      cartData.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              qty: cartItem.qty + 1,
            }
          : cartItem
      )
    );
  };
  const decrement = (item) => {
    setcartData(
      cartData.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              qty: cartItem.qty - 1,
            }
          : cartItem
      )
    );
  };
  const handleDeleteCart = () => {
    let arr = [...cartData];
    let index = cartData?.findIndex((f) => f.id === id);
    arr.splice(index, 1);

    dispatch(deleteCart(arr));
  };
  let Subtotal = cartData.reduce(function (accumulator, curValue) {
    return accumulator + curValue.price * curValue.qty;
  }, 0);

  const Delivery = 0;
  const Total = Subtotal + Delivery;

  return (
    <div>
      {cartData?.length > 0 ? (
        <div>
          <div className="offcanvas-header">
            <h3 className="offcanvas-title" id="offcanvasBottomLabel">
              Your Orders
            </h3>
          </div>
          <hr />
          <div className="offcanvas-body small">
            <table className="table">
              <tbody>
                {cartData?.map((l) => (
                  <tr key={l.name}>
                    <td>
                      <Image
                        src={`/assets/img/menu/${l.image}`}
                        alt=""
                        height={100}
                        width={100}
                      />
                    </td>
                    <td className="h5">{l.name}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-danger"
                          onClick={() => decrement(l)}
                        >
                          -
                        </button>
                        <button className="btn btn-danger">{l.qty}</button>
                        <button
                          className="btn btn-danger"
                          onClick={() => increment(l)}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>&#8377;{l.price * l.qty}</td>
                    <td
                      onClick={() => {
                        setId(l.id);
                        showModal();
                      }}
                    >
                      <Image
                        src="/assets/img/delete.png"
                        alt=""
                        height={50}
                        width={50}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td> <td></td>
                  <td className="h5">Subtotal</td>
                  <td>{Subtotal}</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td> <td></td>
                  <td className="h5">Delivery</td>
                  <td>{Delivery}</td>
                  <td></td>
                </tr>{" "}
                <tr>
                  <td></td> <td></td>
                  <td className="h5">Total</td>
                  <td>{Total}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div>
              <Button
                size="large"
                type="primary"
                danger
                className="btn-or"
                onClick={showAddressModal}
              >
                Orders
              </Button>
            </div>
            <Modal
              title="Are you sure "
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okType="danger"
            >
              <p>You want to delete this item?</p>
            </Modal>
            <Modal
              open={isAddress}
              onCancel={handleAddressCancel}
              footer={null}
            >
              <Address onCancel={handleAddressCancel} total={Total} />
            </Modal>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}

export default React.memo(Cart);
