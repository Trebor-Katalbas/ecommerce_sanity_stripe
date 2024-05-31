import React from "react";
import { client } from "../../lib/client";
import { Product } from "../../components";

const Productpage = ({ products }) => {
  return (
    <>
      <div>Products</div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: { products },
  };
};

export default Productpage;
