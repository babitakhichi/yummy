import Image from "next/image";
import React from "react";

function Menu({ menu }) {
  return (
    <div class="tab-pane fade active show" id="menu-starters">
      <div class="row gy-5">
        {menu.map((item, index) => {
          return (
            <div class="col-lg-4 menu-item" key={index}>
              <a href={`/assets/img/menu/${item.image}`} class="glightbox">
                <Image
                  src={`/assets/img/menu/${item.image}`}
                  class="menu-img img-fluid"
                  alt=""
                  height={300}
                  width={300}
                />
              </a>
              <div className="m-5">
                <h4>{item.name}</h4>
                <p class="ingredients">Lorem, deren, trataro, filede, nerada</p>
                <p class="price">${item.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
