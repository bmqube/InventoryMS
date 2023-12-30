export default function Card({ className, number, text }) {
  return (
    <div className="col-12 col-md-6 col-lg-3 mb-3">
      <div className="card h-100">
        <div className="card-body">
          <div className="d-flex flex-col align-items-center">
            <h1 className={"card-title me-3 text-" + className}>{number}</h1>
            <p className="card-text">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
