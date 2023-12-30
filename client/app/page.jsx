"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/Card";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [triggerGetProducts, setTriggerGetProducts] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      let getProductsUrl = "http://localhost:8000/inventory/";
      try {
        const response = await axios.get(getProductsUrl);
        // console.log(response.data.data);
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProducts();
  }, [triggerGetProducts]);

  const deleteProduct = async () => {
    let deleteProductUrl = `http://localhost:8000/inventory/${productId}`;
    try {
      if (productId) {
        const response = await axios.delete(deleteProductUrl);
        console.log(response.data);
        setTriggerGetProducts(!triggerGetProducts);
      }
    } catch (error) {
      console.log(error);
    }
    setShowModal(false);
    setProductId("");
  };

  return (
    <section className="container-md">
      {products && products.length > 0 ? (
        <>
          {showModal && (
            <div className="modal" onClick={() => setShowModal(false)}>
              <div
                className="modal-content p-4 bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <p>
                  <span className="text-warning m-2">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                  </span>
                  <span className="text-muted">
                    Are you sure you want to delete this item?
                  </span>
                </p>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={deleteProduct}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="row align-items-stretch">
            <Card
              className="primary"
              number={products.length}
              text="types of products in the inventory"
            />
            <Card
              className="success"
              number={products.reduce(
                (total, e) => total + e.cost * e.quantity,
                0
              )}
              text="BDT worth of products in the inventory"
            />
            <Card
              className="warning"
              number={products.reduce(
                (total, product) => total + product.quantity,
                0
              )}
              text="number of items in the inventory"
            />
            <Card
              className="danger"
              number={products.reduce(
                (total, product) => total + (product.belowThreshold ? 1 : 0),
                0
              )}
              text="products needs to be restocked"
            />
          </div>
          <div className="bg-white p-3">
            <div className="d-flex justify-content-center">
              <h5 className="mb-3 mt-2 border-bottom border-2 border-success p-2">
                Current Inventory
              </h5>
            </div>
            <table className="table table-hover">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Cost</th>
                  <th scope="col">Action</th>
                  <th scope="col">More Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    // className={product.belowThreshold ? "table-danger" : ""}
                  >
                    <th scope="row">{index + 1}</th>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.quantity}</td>
                    <td>{product.cost}</td>
                    <td>
                      <button className="btn btn-sm">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        className="btn btn-sm"
                        onClick={() => {
                          setShowModal(true);
                          setProductId(product.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                    <td>
                      {product.belowThreshold ? (
                        <button className="btn btn-sm btn-outline-danger">
                          Restock
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
}
