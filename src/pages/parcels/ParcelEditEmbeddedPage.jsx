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

const ParcelEditEmbeddedPage = () => {
  const { actualityId } = useParams();
  const navigate = useNavigate();

  const { actualityService } = useContext(AppContext);
  // Default values
  const defaultValues = {
    idParcel: "",
    idCrowdshipper: "",
    idRecipient: "",
    // parcelSize: "",
    parcelWeight: "",
    parcelHeight: "",
    parcelWidth: "",
    parcelLength: "",
    parcelDescription: "",
    warehouse: "",
    // parcelImage: "",
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

  // Fonction pour la suppression de l'actuality (exemple simple)
  const handleDelete = async () => {
    setIsLoading(true);
    const response = await actualityService.deleteActualityById(actualityId);
    setIsLoading(false);
    if (response.error) {
      console.error(response.message);
      dispatchToast("error", response.message);
      return;
    }

    handleReset();
    console.log("Suppression de l'actualité");
    dispatchToast("success", "Actualité supprimée");
    setTimeout(() => {
      navigate("/actualites");
    }, TIMEOUT_REFRESH);
  };

  const getActualityById = async () => {
    const response = await actualityService.getActualityById(actualityId);
    if (response.error) {
      console.error(response.message);
      dispatchToast("error", response.message);
      return;
    }
    const actuality = response.data;
    setValues({
      id: actuality.id,
      title: actuality.title,
      description: actuality.description,
      event: actuality.event,
      image: actuality.image,
      publicationDate: handleFormatDateTime(
        new Date(actuality.publicationDate)
      ),
    });
  };

  useEffect(() => {
    getActualityById();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={`Actualités / ${actualityId}`} />

      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        <div className="flex justify-end mb-4 space-x-4">
          {!isLoading && (
            <>
              {/* <Link to="/nouveau-utilisateur">
                <Button
                  variant="text"
                  startIcon={<Add />}
                >
                  Créer un nouveau
                </Button>
              </Link> */}
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
            name="idParcel"
            value={values.idParcel}
            onChange={handleChange}
          />
          <TextField
            label="ID Crowdshipper"
            variant="outlined"
            fullWidth
            name="idCrowdshipper"
            value={values.idCrowdshipper}
            multiline
            onChange={handleChange}
          />
          <TextField
            label="ID Recipient"
            variant="outlined"
            fullWidth
            name="idRecipient"
            value={values.idRecipient}
            multiline
            onChange={handleChange}
          />
          <TextField
            label="Poids"
            variant="outlined"
            fullWidth
            name="weight"
            value={values.parcelWeight}
            multiline
            onChange={handleChange}
          />
          <TextField
            label="Hauteur"
            variant="outlined"
            fullWidth
            name="height"
            value={values.parcelHeight}
            multiline
            onChange={handleChange}
          />
          <TextField
            label="Largeur"
            variant="outlined"
            fullWidth
            name="width"
            value={values.parcelWidth}
            multiline
            onChange={handleChange}
          />
          <TextField
            label="Longueur"
            variant="outlined"
            fullWidth
            name="length"
            value={values.parcelLength}
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
              {/* Bouton Supprimer */}
              <Button
                variant="outlined"
                onClick={handleDelete}
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
