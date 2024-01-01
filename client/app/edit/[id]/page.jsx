"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "@/components/Form";
import { useParams } from "next/navigation";

export default function EditItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const productId = useParams().id;

  useEffect(() => {
    async function fetchProduct() {
      let getProductUrl = `http://localhost:8000/inventory/${productId}`;
      try {
        const response = await axios.get(getProductUrl);
        const product = response.data.data;
        setName(product.name);
        setDescription(product.description);
        setQuantity(product.quantity);
        setCost(product.cost);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    let updateProductUrl = "http://localhost:8000/inventory/" + productId;
    try {
      if (name && description && quantity && cost) {
        const response = await axios.put(updateProductUrl, {
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

        // redirect to home page after 2 seconds
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setError("Please fill all the fields");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="container-md">
      <div className="d-flex justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-4 bg-white p-5 mt-5 rounded">
          <h3 className="mb-3 border-bottom border-4 border-success">
            Edit Item
          </h3>
          <Form
            name={name}
            description={description}
            quantity={quantity}
            cost={cost}
            error={error}
            success={success}
            setError={setError}
            setSuccess={setSuccess}
            setName={setName}
            setDescription={setDescription}
            setQuantity={setQuantity}
            setCost={setCost}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}
