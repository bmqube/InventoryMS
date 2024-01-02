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
  const [isRestocking, setIsRestocking] = useState("");
  const [restockQuantity, setRestockQuantity] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      let getProductsUrl = "http://localhost:8000/inventory";
      try {
        const response = await axios.get(getProductsUrl);
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
        setTriggerGetProducts(!triggerGetProducts);
      }
    } catch (error) {
      console.log(error);
    }
    setShowModal(false);
    setProductId("");
  };

  const handleRestock = async () => {
    let restockProductUrl = `http://localhost:8000/inventory/restock/${isRestocking}`;
    try {
      if (isRestocking && restockQuantity > 0) {
        const response = await axios.put(restockProductUrl, {
          quantity: restockQuantity,
        });
        console.log(response.data);
        setRestockQuantity(0);
        setTriggerGetProducts(!triggerGetProducts);
      }
    } catch (error) {
      console.log(error);
    }
    setIsRestocking("");
  };

  return (
    <section className="container-md">
      {products && products.length > 0 ? (
        <>
          {/* Modal  */}
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

          {/* Cards showing various information */}
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

          {/* Table showing all the items in the inventory */}
          <div className="bg-white p-3">
            <div className="d-flex justify-content-center">
              <h5 className="mb-3 mt-2 border-bottom border-2 border-success p-2">
                Current Inventory
              </h5>
            </div>
            <div className="table-responsive">
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
                <tbody className="table-group-divider">
                  {products.map((product, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.quantity}</td>
                      <td>{product.cost}</td>
                      <td>
                        <a className="btn btn-sm" href={"/edit/" + product.id}>
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </a>
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
                          isRestocking == product.id ? (
                            <div className="d-flex align-items-center">
                              <input
                                className="form-control form-control-sm me-2"
                                type="number"
                                min={0}
                                value={restockQuantity}
                                onChange={(e) => {
                                  setRestockQuantity(e.target.value);
                                }}
                                style={{ maxWidth: "80px", minWidth: "60px" }}
                              />

                              <button
                                onClick={handleRestock}
                                className="btn btn-sm btn-outline-success me-2"
                              >
                                Add
                              </button>
                              <button
                                className="btn btn-sm btn-close"
                                onClick={() => {
                                  setIsRestocking("");
                                }}
                              ></button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setIsRestocking(product.id);
                              }}
                              className="btn btn-sm btn-outline-danger"
                            >
                              Restock
                            </button>
                          )
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white p-3">
          <div className="d-flex justify-content-center">
            <h5 className="my-3 p-2">
              No products in the inventory. Please add some.
            </h5>
          </div>
        </div>
      )}
    </section>
  );
}
