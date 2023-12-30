"use client";
import { useState } from "react";
import axios from "axios";

export default function AddNew() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    let createProductUrl = "http://localhost:8000/inventory/";
    try {
      if (name && description && quantity && cost) {
        const response = await axios.post(createProductUrl, {
          name,
          description,
          quantity,
          cost,
        });
        setSuccess(response.data.message);
        setName("");
        setDescription("");
        setQuantity(0);
        setCost(0);
      } else {
        setError("Please fill all the fields");
      }
    } catch (error) {
      setError(error.message);
      //   console.log(error);
    }
  };

  return (
    <section className="container-md">
      <div className="d-flex justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-4 bg-white p-5 mt-5 rounded">
          <h3 className="mb-3 border-bottom border-4 border-success">
            Add New Item
          </h3>
          <form
            onFocus={() => {
              setError("");
              setSuccess("");
            }}
          >
            <div className="mb-3">
              <label className="form-label">Name of the Item</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                rows={4}
                className="form-control"
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                type="number"
                min={0}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cost</label>
              <input
                value={cost}
                onChange={(e) => {
                  setCost(e.target.value);
                }}
                type="number"
                min={0}
                className="form-control"
              />
            </div>
            {error && (
              <div className="alert alert-danger fade show">
                <div>{error}</div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setError("");
                  }}
                ></button>
              </div>
            )}
            {success && (
              <div className="alert alert-success fade show">
                <div>{success}</div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setSuccess("");
                  }}
                ></button>
              </div>
            )}
            <div className="d-grid">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-outline-success"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
