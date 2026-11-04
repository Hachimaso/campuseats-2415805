import { useVendors } from "../hooks/useVendors.js";
import VendorCard from "../components/VendorCard.jsx";
import SpecialBanner from "../components/SpecialBanner.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";

function HomePage() {
  const { vendors, loading, error, reload } = useVendors();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  // 1. Find vendor that has a special menu item
  const specialVendor = vendors.find((v) =>
    v.menu.some((item) => item.special),
  );

  // 2. To extract special item
  const specialItem = specialVendor?.menu.find((item) => item.special);

  return (
    <>
      {/* 3. Pass both specialItem and vendorId to SpecialBanner*/}
      <SpecialBanner specialItem={specialItem} vendorId={specialVendor?.id} />

      <section>
        <h2 className="section-title">Today's vendors</h2>
        <div className="vendor-grid">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
