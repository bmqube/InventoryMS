export default function Navbar() {
  return (
    <nav className="navbar bg-body-tertiary mb-4">
      <div className="container-md">
        <a className="navbar-brand me-auto" href="/">
          IMS - Inventory Management System
        </a>

        <a className="btn btn-success" href="/new">
          Add New Item
        </a>
      </div>
    </nav>
  );
}
