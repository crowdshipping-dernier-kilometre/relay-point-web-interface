import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";

import {
  AlertTriangle,
  Blocks,
  CircleCheckBig,
  DollarSign,
  Loader,
  Newspaper,
  Package,
  PackageCheck,
  RefreshCcwDot,
  TrendingUp,
} from "lucide-react";
import ActualitiesTable from "../../components/parcels/ParcelsTable";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AppContext } from "../../services/context/AppContext";
import { useState, useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import ParcelsTable from "../../components/parcels/ParcelsTable";

const ParcelsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Colis" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <ParcelStats />

        {/* <ProductsTable /> */}

        <div className="flex justify-end mb-4 space-x-4">
          <Link to="/nouvelle-actualite">
            <Button
              variant="text"
              startIcon={<Add />}
            >
              Créer une nouvelle
            </Button>
          </Link>
        </div>

        <ParcelsTable />

        <ToastContainer />

        {/* CHARTS */}
        {/* <div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div> */}
      </main>
    </div>
  );
};
export default ParcelsPage;

export const ParcelStats = ({ title }) => {
  const [ParcelsStats, setParcelsStats] = useState({
    total: "...",
    publishedLastSevenDays: "...",
  });
  const { actualityService } = useContext(AppContext);

  const getParcelsStats = async () => {
    const response = await actualityService.getParcelsStats();
    if (response.error) {
      console.error(response.message);
      dispatchToast("error", response.message);
    } else {
      setParcelsStats(response.data);
    }
  };

  useEffect(() => {
    getParcelsStats();
  }, []);

  return (
    <>
      {title && (
        <motion.div
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {title}
        </motion.div>
      )}

      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard
          name="Total Colis"
          icon={Package}
          value={ParcelsStats.total}
          color="#6366F1"
        />

        <StatCard
          name="Arrivés au Point Relais"
          icon={RefreshCcwDot}
          value={ParcelsStats.publishedLastSevenDays}
          color="#F59E0B"
        />

        <StatCard
          name="En attente de crowdshipper"
          icon={Blocks}
          value={ParcelsStats.publishedLastSevenDays}
          color="#EF4444"
        />

        <StatCard
          name="En cours de livraison"
          icon={Loader}
          value={ParcelsStats.publishedLastSevenDays}
          color="#F59E"
        />

        <StatCard
          name="Livrés au client"
          icon={PackageCheck}
          value={ParcelsStats.publishedLastSevenDays}
          color="#10B981"
        />
        <StatCard
          name="Cloturés par le Point Relais"
          icon={CircleCheckBig}
          value={ParcelsStats.publishedLastSevenDays}
          color="#22C55E"
        />
      </motion.div>
    </>
  );
};
