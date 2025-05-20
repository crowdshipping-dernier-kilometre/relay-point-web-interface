import React, { useState, useContext } from "react";
import { TextField, Button, Checkbox, Autocomplete } from "@mui/material";
import Header from "../../components/common/Header";
import { Add, Delete, Edit, Save } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../services/context/AppContext";
import { CircularProgress } from "@mui/material";
import { dispatchToast, handleFormatDateTime } from "../../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { PackageSearch, Search } from "lucide-react";

const ParcelPickUpCodePage = () => {
  const { parcelService } = useContext(AppContext);
  const navigate = useNavigate();

  // Default values
  const defaultValues = {
    code: "",
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

  const searchParcelByCode = async () => {
    setIsLoading(true);
    // const response = await parcelService.getParcelByCode(values.code);
    setIsLoading(false);
    if (response.error) {
      console.error(response.message);
      dispatchToast("error", response.message);
      dispatchToast("error", "Colis introuvable");
      // return;
    }
    dispatchToast("success", "Colis trouvé");
    navigate(`/crowdshipper-retrait-colis-details/${response.data.id}`);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={`Crowdshipper Code Pick Up`} />

      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        <div
          className="grid grid-cols-1 gap-4 p-8"
          style={{
            backgroundColor: "#18212F",
            borderRadius: "16px",
          }}
        >
          <div className="text-sm font-semibold text-gray-100">
            Renseignez le code fourni par le crowdshipper.
          </div>

          <TextField
            label="Code"
            variant="outlined"
            fullWidth
            name="code"
            value={values.code}
            onChange={handleChange}
          />
          {/* <TextField
            label="Description"
            variant="outlined"
            fullWidth
            name="description"
            value={values.description}
            multiline
            onChange={handleChange}
          /> */}
        </div>

        <ToastContainer />
        {/* Bouton Enregistrer */}
        <div className="flex flex-row justify-end space-x-4 mt-8">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              disabled={!values.code}
              startIcon={<PackageSearch />}
              onClick={searchParcelByCode}
            >
              Rechercher le colis
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default ParcelPickUpCodePage;
