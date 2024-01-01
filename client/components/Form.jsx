import React from "react";

export default function Form({
  name,
  description,
  quantity,
  cost,
  error,
  success,
  setError,
  setSuccess,
  setName,
  setDescription,
  setQuantity,
  setCost,
  handleSubmit,
}) {
  return (
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
  );
}
