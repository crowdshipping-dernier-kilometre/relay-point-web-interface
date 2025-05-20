import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Checkbox } from "@mui/material";
import Header from "../../components/common/Header";
import { Add, Delete, Edit, LockOpen, Save } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { dispatchToast, handleFormatDateTime } from "../../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../../services/context/AppContext";
import { TIMEOUT_REFRESH } from "../../utils/constants";
import { set } from "date-fns";

const ParcelEditEmbeddedPage = () => {
  const { parcelId } = useParams();
  const navigate = useNavigate();

  const { parcelService } = useContext(AppContext);
  // Default values
  const defaultValues = {
    id: "",
    crowdshipperId: "",
    recipientId: "",
    parcelSize: "",
    parcelWeight: "",
    parcelVolume: "",
    warehouse: "",
  };

  // States
  const [values, setValues] = useState(defaultValues);
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
  };

  // Fonction pour la suppression du colis (exemple simple)
  const handleDelete = async () => {
    setIsLoading(true);
    const response = await parcelService.deleteParcelById(parcelId);
    setIsLoading(false);
    if (response.error) {
      console.error(response.message);
      dispatchToast("error", response.message);
      return;
    }

    handleReset();
    console.log("Suppression du colis");
    dispatchToast("success", "Colis supprimé");
    setTimeout(() => {
      navigate("/colis");
    }, TIMEOUT_REFRESH);
  };

  const getParcelById = async () => {
    const response = await parcelService.getParcelById(parcelId);
    if (response.error) {
      console.error(response.message);
      dispatchToast("error", response.message);
      return;
    }
    const actuality = response.data;
    setValues({
      id: actuality.id,
      crowdshipperId: actuality.crowdshipperId,
      recipientId: actuality.recipientId,
      parcelSize: actuality.parcelSize,
      parcelWeight: actuality.parcelWeight,
      parcelVolume: actuality.parcelVolume,
      warehouse: actuality.warehouse,
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    const response = await parcelService.updateParcelById(parcelId, values);
    setIsLoading(false);
    if (response.error) {
      console.error(response.message);
      dispatchToast("error", response.message);
      return;
    }
    dispatchToast("success", "Modifications enregistrées");
    setIsEditing(false);
    getParcelById();
  };

  useEffect(() => {
    // getParcelById();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={`Colis / ${values.id}`} />

      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        <div className="flex justify-end mb-4 space-x-4">
          {!isLoading && (
            <>
              <Button
                variant="text"
                startIcon={<Edit />}
                onClick={() => setIsEditing(!isEditing)}
              >
                Modifier
              </Button>

              <Link to="/nouveau-colis">
                <Button
                  variant="text"
                  startIcon={<Add />}
                >
                  Créer un nouveau colis
                </Button>
              </Link>
            </>
          )}
        </div>
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
            onChange={handleChange}
          />
          <TextField
            label="ID Crowdshipper"
            variant="outlined"
            fullWidth
            name="crowdshipperId"
            value={values.crowdshipperId}
            multiline
            onChange={handleChange}
          />
          <TextField
            label="ID Recipient"
            variant="outlined"
            fullWidth
            name="recipientId"
            value={values.recipientId}
            multiline
            onChange={handleChange}
          />
          <TextField
            label="Poids"
            variant="outlined"
            fullWidth
            name="parcelWeight"
            value={values.parcelWeight}
            multiline
            onChange={handleChange}
          />
          <TextField
            label="Volume"
            variant="outlined"
            fullWidth
            name="parcelVolume"
            value={values.parcelVolume}
            multiline
            onChange={handleChange}
          />
          <TextField
            label="Taille"
            variant="outlined"
            fullWidth
            name="parcelSize"
            value={values.parcelSize}
            multiline
            onChange={handleChange}
          />
          <TextField
            label="Warehouse"
            variant="outlined"
            fullWidth
            name="warehouse"
            value={values.warehouse}
            multiline
            onChange={handleChange}
          />
        </div>

        <ToastContainer />
        {/* Bouton Enregistrer */}
        <div className="flex flex-row justify-end space-x-4 mt-8">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {/* Bouton Enregistrer */}
              <Button
                variant="contained"
                onClick={() => {
                  toast.success("Modifications enregistrées");
                }}
                disabled={!isModified}
                startIcon={<Save />}
              >
                Enregistrer
              </Button>

              {/* Bouton Supprimer */}
              <Button
                variant="outlined"
                onClick={() => {
                  toast.success("Colis supprimé");
                  setTimeout(() => {
                    navigate("/colis");
                  }, 3000);
                }}
                color="error"
                startIcon={<Delete />}
              >
                Supprimer
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ParcelEditEmbeddedPage;
