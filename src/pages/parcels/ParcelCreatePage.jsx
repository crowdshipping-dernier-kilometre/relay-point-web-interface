import React, { useState, useContext } from "react";
import { TextField, Button, Checkbox } from "@mui/material";
import Header from "../../components/common/Header";
import { Add, Delete, Edit, Save } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../services/context/AppContext";
import { CircularProgress } from "@mui/material";
import { dispatchToast, handleFormatDateTime } from "../../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import { Warehouse } from "lucide-react";

const ParcelCreatePage = () => {
  const { actualityService } = useContext(AppContext);

  // Default values
  const defaultValues = {
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

  // Function to convert a file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // States
  const [values, setValues] = useState(defaultValues);
  const [isLoading, setIsLoading] = useState(false);

  // Function for handling input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Fonction pour réinitialiser les changements
  const handleReset = () => {
    setValues(defaultValues);
  };

  const handleCreate = async () => {
    setIsLoading(true);
    const response = await actualityService.createActuality({
      title: values.title,
      description: values.description,
      event: values.event,
      image: values.imageBase64,
    });
    setIsLoading(false);
    if (response.error) {
      console.error(response.message);
      dispatchToast("error", response.message);
      return;
    }
    dispatchToast("success", "Nouveau colis de livraison ajouté");
    handleReset();
  };

  const handleChangeImage = async (event) => {
    const file = event.target.files[0]; // Récupère le fichier
    // Lire le fichier sous forme de tableau binaire
    const arrayBuffer = await file.arrayBuffer();
    const byteArray = new Uint8Array(arrayBuffer); // Conversion en tableau d'octets

    //const base64 = fileToBase64(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Génère une URL temporaire
        setValues({
          ...values,
          image: reader.result, // URL pour le preview
          imageFile: file, // Fichier brut
          imageByteArray: byteArray,
          imageBase64: reader.result.split(",")[1], // Conversion en base64
        });
      };
      reader.readAsDataURL(file); // Convertit le fichier en Data URL
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={`Nouveau colis de livraison`} />

      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
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
          {/* <div className="flex items-center justify-start mb-6">
            <Checkbox
              color="primary"
              name="event"
              checked={values.event}
              onChange={(e) =>
                setValues({ ...values, event: e.target.checked })
              }
            />
            <p className="text-white-600">C'est un evenement ?</p>
          </div> */}
          {values.image && (
            <div className="flex items-center mb-4">
              <img
                src={values.image}
                alt={values.imageFile?.name}
                className="w-48 h-48 object-fit mr-4"
              />
              <div>
                <p className="text-white-600">{values.imageFile?.name}</p>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Delete />}
                  onClick={() =>
                    setValues({ ...values, image: null, imageFile: null })
                  }
                >
                  Supprimer
                </Button>
              </div>
            </div>
          )}

          <Button
            variant="outlined"
            component="label"
          >
            Ajouter une image
            <input
              type="file"
              hidden
              onChange={handleChangeImage}
              accept="image/*"
            />
          </Button>
        </div>

        <ToastContainer />
        {/* Bouton Enregistrer */}
        <div className="flex flex-row justify-end space-x-4 mt-8">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              disabled={
                !values.idParcel ||
                !values.idCrowdshipper ||
                !values.idRecipient
              }
              startIcon={<Add />}
              onClick={handleCreate}
            >
              Ajouter le colis
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default ParcelCreatePage;
