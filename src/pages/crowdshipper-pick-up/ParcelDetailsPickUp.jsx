import React, { useState, useContext, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Header from "../../components/common/Header";
import { Add, Block, Delete, Edit, LockOpen, Save } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {
  dispatchToast,
  handleFormatBoolean,
  handleFormatDateTime,
} from "../../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../../services/context/AppContext";
import { TIMEOUT_REFRESH } from "../../utils/constants";
import { Package } from "lucide-react";

const ParcelDetailsPickUpPage = () => {
  const { parcelId } = useParams();
  const navigate = useNavigate();

  const { parcelService } = useContext(AppContext);
  // Default values
  const defaultValues = {
    id: "",
    crowdshipperId: "",
    recipientId: "",
    packageSize: handleFormatBoolean(false),
    packageWeight: "",
    arrivedAtRelayPointAt: "",
  };

  // States
  const [values, setValues] = useState(defaultValues);
  const [category, setCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function for handling input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setIsModified(true);
  };

  // Fonction pour réinitialiser les changements
  const handleReset = () => {
    setValues(defaultValues);
    setIsModified(false);
    // setCategory(null);
  };

  const getParcelById = async () => {
    // const response = await parcelService.getParcelById(parcelId);
    // if (response.error) {
    //   console.error(response.message);
    //   dispatchToast("error", response.message);
    //   return;
    // }
    // const parcel = response.data;
    // setValues({
    //   id: parcel.id,
    //   crowdshipperId: parcel.crowdshipperId,
    //   recipientId: parcel.recipientId,
    //   packageSize: handleFormatBoolean(parcel.packageSize),
    //   packageWeight: parcel.packageWeight,
    //   arrivedAtRelayPointAt: handleFormatDateTime(parcel.arrivedAtRelayPointAt),
    // });
  };

  const pickupParcelByCrowdshipper = async () => {
    setIsLoading(true);
    // const response = await parcelService.pickupParcelByCrowdshipper(parcelId);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    // if (response.error) {
    //   console.error(response.message);
    //   dispatchToast("error", response.message);
    //   return;
    // }
    console.log("Colis récupéré par le crowdshipper");
    dispatchToast("success", "Colis récupéré par le crowdshipper");
    setTimeout(() => {
      navigate("/crowdchipper-retrait-colis-code");
    }, TIMEOUT_REFRESH);
  };

  useEffect(() => {
    getParcelById();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={`Colis / ${parcelId}`} />

      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        {/* <div className="flex justify-end mb-4 space-x-4">
          {!isLoading && (
            <>
              <Link to="/nouvelle-communaute">
                <Button
                  variant="text"
                  startIcon={<Add />}
                >
                  Créer une nouvelle
                </Button>
              </Link>
            </>
          )}
        </div> */}
        <div
          className="grid grid-cols-1 gap-4 p-8"
          style={{
            backgroundColor: "#18212F",
            borderRadius: "16px",
          }}
        >
          <TextField
            label="ID Colis"
            variant="outlined"
            fullWidth
            name="id"
            value={values.id}
            disabled
          />
          <TextField
            label="ID Crowdshipper"
            variant="outlined"
            fullWidth
            name="idCrowdshipper"
            value={values.crowdshipperId}
            onChange={handleChange}
            disabled
          />
          <TextField
            label="ID Recipient"
            variant="outlined"
            fullWidth
            name="idRecipient"
            value={values.description}
            onChange={handleChange}
            disabled
          />
          <TextField
            label="Taille du colis"
            variant="outlined"
            fullWidth
            name="parcelSize"
            value={values.categoryName ?? ""}
            onChange={handleChange}
            disabled
          />
          <TextField
            label="Poids du colis"
            variant="outlined"
            fullWidth
            name="parcelSize"
            value={values.categoryName ?? ""}
            onChange={handleChange}
            disabled
          />
        </div>

        <ToastContainer />
        {/* Bouton Enregistrer */}
        <div className="flex flex-row justify-end space-x-4 mt-8">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {/* Bouton Supprimer */}
              <Button
                variant="outlined"
                onClick={pickupParcelByCrowdshipper}
                startIcon={<Package />}
              >
                Retrait du colis par le crowdshipper
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ParcelDetailsPickUpPage;
