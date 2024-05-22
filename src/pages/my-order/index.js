import { selectuser } from "@/redux/cartSlice";
import { Spin } from "antd";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const [order, setOrder] = useState([]);
  const [loader, setloader] = useState(false);
  const user = useSelector(selectuser);
  const onCart = async () => {
    setloader(true);
    try {
      let response = await fetch("/api/users?id=" + user._id, {
        method: "GET",
      });

      // get the data
      let data = await response.json();

      if (data.success) {
        // reset the fields
        setOrder(data?.data?.order);
      } else {
        // set the error
        return console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setloader(false);
  };

  useEffect(() => {
    onCart();
  }, []);
  return loader ? (
    <div className="centered-container   ">
      <Spin size="large" />
    </div>
  ) : (
    <section className="food-area ">
      <div className="container">
        <h1 className="my-order-heading">My Orders</h1>
        <div className="container">
          <div className="row my-5">
            {order?.length > 0 ? (
              order?.map((item, index) => {
                return (
                  <div className="col-md-4 mb-4" key={index}>
                    <div className="card text-center">
                      <Image
                        src={`/assets/img/menu/${item?.image}`}
                        className="card-img-top"
                        alt=""
                        height={150}
                        width={250}
                      />
                      <div className="card-body ">
                        <h5 className="mb-4">{item.name}</h5>

                        <h3>$ {item.price}</h3>
                      </div>
                      <div class="buttons">
                        <button
                          class="blob-btn"
                          onClick={() => router.push("/home")}
                        >
                          Order Again
                          <span class="blob-btn__inner">
                            <span class="blob-btn__blobs">
                              <span class="blob-btn__blob"></span>
                              <span class="blob-btn__blob"></span>
                              <span class="blob-btn__blob"></span>
                              <span class="blob-btn__blob"></span>
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="container-no-data">
                <Image
                  src={"/assets/img/cat.jpg"}
                  alt=""
                  height={150}
                  width={150}
                />
                <h1>Data Not Found</h1>

                <p className="mb-0">
                  There are no Orders to show here right now....
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyOrders;
