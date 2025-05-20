import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import { ParcelStats } from "../parcels/ParcelsPage";

const OverviewPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Aperçu" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div
          className="flex flex-wrap justify-center mb-8"
          style={{ backgroundColor: "#fff" }}
        >
          <img
            src="/images/insa-hdf-logo.webp"
            alt="Overview"
            width={300}
          />
          <img
            src="/images/uphf-logo.webp"
            alt="Overview"
            width={300}
          />
          <img
            src="/images/lamih-logo.png"
            alt="Overview"
            width={300}
          />
          <img
            src="/images/milex-logo.png"
            alt="Overview"
            width={300}
          />
          <img
            src="/images/ecc-logo.png"
            alt="Overview"
            width={300}
          />
          <img
            src="/images/tec-leg-logo.png"
            alt="Overview"
            width={300}
          />
        </div>

        {/* STATS */}
        <ParcelStats title={"Colis"} />
      </main>
    </div>
  );
};
export default OverviewPage;
