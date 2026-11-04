import { useParams } from "react-router";
import { useVendors } from "../hooks/useVendors.js";
import MenuList from "../components/MenuList.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";

function VendorPage() {
  const { id } = useParams();
  const { vendors, loading, error, reload } = useVendors();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const vendor = vendors.find((v) => v.id === id);

  if (!vendor) {
    return <div className="card"><p>Vendor not found.</p></div>;
  }

  return (
    <section>
      <h2 className="section-title">Menu: {vendor.name}</h2>
      <p className="muted">{vendor.location} • Open: {vendor.openHours}</p>
      <MenuList items={vendor.menu} />
    </section>
  );
}

export default VendorPage;