import React, { useState, useContext } from "react";
import { TextField, Button, Checkbox, Autocomplete } from "@mui/material";
import Header from "../../components/common/Header";
import { Add, Delete, Edit, Save } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../services/context/AppContext";
import { CircularProgress } from "@mui/material";
import { dispatchToast, handleFormatDateTime } from "../../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { PackageSearch, Search } from "lucide-react";

const ParcelPickUpCodePage = () => {
  const { communityService, categoryService } = useContext(AppContext);

  // Default values
  const defaultValues = {
    name: "",
    description: "",
    isPublic: true,
    adminToken: "",
    categoryId: "",
  };

  // States
  const [values, setValues] = useState(defaultValues);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  // const [categories, setCategories] = useState([
  //   { label: "Categorie 1", value: "1" },
  //   { label: "Categorie 2", value: "2" },
  //   { label: "Categorie 3", value: "3" },
  // ]);
  const [categoryCreationNameField, setCategoryCreationNameField] =
    useState("");

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
    // setIsLoading(true);
    // const response = await communityService.createCommunity({
    //   nom: values.name,
    //   description: values.description,
    //   isPublic: values.isPublic,
    //   categoryId: values.categoryId,
    //   adminToken: Cookies.get("token"),
    // });
    // setIsLoading(false);
    // if (response.error) {
    //   console.error(response.message);
    //   dispatchToast("error", response.message);
    //   return;
    // }
    // dispatchToast("success", "Communauté créée");
    // handleReset();
  };

  // get all users
  const getCategories = async () => {
    const response = await categoryService.getAllCategories();
    if (response.error) {
      toast.error(response.message);
      console.error(response.message);
      return;
    }
    const data = response.data;
    // console.log(data);
    const categoriesData = data.map((category) => {
      return {
        label: `${category.name} [${category.id}]`,
        value: category.id,
      };
    });
    setCategories(categoriesData);
  };

  const handleCreateCategory = async () => {
    setIsLoading(true);
    const response = await categoryService.createCategory({
      name: categoryCreationNameField,
    });
    setIsLoading(false);
    if (response.error) {
      dispatchToast("error", response.message);
      console.error(response.message);
      return;
    }
    dispatchToast(
      "success",
      "Categorie créée! Vous pouvez maintenant la choisir"
    );
    getCategories();
    Promise.all([getCategories()]);
  };

  React.useEffect(() => {
    getCategories();
  }, []);

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
              disabled={!values.name || !values.description}
              startIcon={<PackageSearch />}
              onClick={handleCreate}
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
