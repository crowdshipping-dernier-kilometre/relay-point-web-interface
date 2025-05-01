import { useState, useEffect, useContext } from "react";
import DataGridComponent from "../common/DataGridComponent";
import { GridActionsCellItem } from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { PanoramaFishEye, RemoveRedEye } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { AppContext } from "../../services/context/AppContext";

import { DATA_GRID_COLUMN_DEFAULT_WIDTH } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import { dispatchToast } from "../../utils/helper";
import { mapActualityForDataGrid } from "../../utils/mapping";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: DATA_GRID_COLUMN_DEFAULT_WIDTH,
  },
  {
    field: "crowdshipperId",
    headerName: "ID Crowdshipper",
    width: DATA_GRID_COLUMN_DEFAULT_WIDTH,
    editable: false,
  },
  {
    field: "recipientId",
    headerName: "ID Destinataire",
    width: DATA_GRID_COLUMN_DEFAULT_WIDTH,
    editable: false,
  },
  {
    field: "parcelSize",
    headerName: "Taille",
    width: DATA_GRID_COLUMN_DEFAULT_WIDTH,
    editable: false,
  },
  {
    field: "parcelWeight",
    headerName: "Poids",
    width: DATA_GRID_COLUMN_DEFAULT_WIDTH,
    editable: false,
  },
  {
    field: "parcelVolume",
    headerName: "Volume",
    width: DATA_GRID_COLUMN_DEFAULT_WIDTH,
    editable: false,
  },
  {
    field: "parcelStatus",
    headerName: "Statut",
    width: DATA_GRID_COLUMN_DEFAULT_WIDTH,
    editable: false,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: DATA_GRID_COLUMN_DEFAULT_WIDTH,
    cellClassName: "actions",
    getActions: ({ id, row }) => {
      return [
        <GridActionsCellItem
          icon={<RemoveRedEye color="success" />}
          label="Voir"
          //showInMenu
          onClick={() => {
            console.log("id : " + id);
            console.log("row : " + JSON.stringify(row));
            window.location.href = `/colis/${id}`;
          }}
        />,
      ];
    },
  },
];

const rows = [
  {
    id: "1",
    crowdshipperId: "23",
    recipientId: "333",
    parcelSize: "12",
    parcelWeight: "34",
    parcelVolume: "16",
    parcelStatus: "En cours",
  },
  {
    id: "2",
    crowdshipperId: "25",
    recipientId: "334",
    parcelSize: "10",
    parcelWeight: "20",
    parcelVolume: "14",
    parcelStatus: "En attente",
  },
  {
    id: "3",
    crowdshipperId: "27",
    recipientId: "335",
    parcelSize: "15",
    parcelWeight: "40",
    parcelVolume: "18",
    parcelStatus: "Livré",
  },
  {
    id: "4",
    crowdshipperId: "23",
    recipientId: "336",
    parcelSize: "13",
    parcelWeight: "22",
    parcelVolume: "15",
    parcelStatus: "Annulé",
  },
  {
    id: "5",
    crowdshipperId: "29",
    recipientId: "337",
    parcelSize: "11",
    parcelWeight: "30",
    parcelVolume: "17",
    parcelStatus: "En cours",
  },
  {
    id: "6",
    crowdshipperId: "30",
    recipientId: "338",
    parcelSize: "16",
    parcelWeight: "50",
    parcelVolume: "20",
    parcelStatus: "En attente",
  },
  {
    id: "7",
    crowdshipperId: "24",
    recipientId: "339",
    parcelSize: "9",
    parcelWeight: "18",
    parcelVolume: "13",
    parcelStatus: "Livré",
  },
  {
    id: "8",
    crowdshipperId: "28",
    recipientId: "340",
    parcelSize: "14",
    parcelWeight: "38",
    parcelVolume: "19",
    parcelStatus: "En cours",
  },
  {
    id: "9",
    crowdshipperId: "31",
    recipientId: "341",
    parcelSize: "10",
    parcelWeight: "25",
    parcelVolume: "14",
    parcelStatus: "Annulé",
  },
  {
    id: "10",
    crowdshipperId: "32",
    recipientId: "342",
    parcelSize: "13",
    parcelWeight: "28",
    parcelVolume: "16",
    parcelStatus: "En cours",
  },
];

const ParcelsTable = () => {
  // const [parcelsData, setparcelsData] = useState([]); // to uncomment during the integration
  // const [parcelsData, setparcelsData] = useState(
  //   rows.map(mapActualityForDataGrid)
  // ); //to comment during the integration
  const [parcelsData, setParcelsData] = useState(rows);

  const { parcelService } = useContext(AppContext);
  const relayPointId = localStorage.getItem("relayPointId");

  const getAllParcelsByRealyPointId = async () => {
    const response = await parcelService.getAllParcelsByRelayPoint(
      relayPointId
    );
    if (response.error) {
      console.error(response.message);
      dispatchToast("error", response.message);
    } else {
      const users = response.data;
      setParcelsData(users.map(mapParcelForDataGrid));
    }
  };

  useEffect(() => {
    // getAllParcelsByRealyPointId();
  }, []);

  return (
    <motion.div
      // className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <ToastContainer />
      <div>
        <DataGridComponent
          rows={parcelsData}
          columns={columns}
        />
      </div>
    </motion.div>
  );
};
export default ParcelsTable;
