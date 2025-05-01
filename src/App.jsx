import { Route, Routes } from "react-router-dom";

// import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/overview/OverviewPage";
import SettingsPage from "./pages/settings/SettingsPage";
import DashboardLayout from "./layouts/DashboardLayout";
import { AppProvider } from "./services/context/AppContext";
import LoginPage from "./pages/auth/LoginPage";
import TestComponent from "./components/common/TestComponent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ProtectedRoute from "./ProtectedRoute";
import GuidePage from "./pages/settings/GuidePage";
import ParcelsPage from "./pages/parcels/ParcelsPage";
import ParcelEditEmbeddedPage from "./pages/parcels/ParcelEditEmbeddedPage";
import ParcelCreatePage from "./pages/parcels/ParcelCreatePage";
import ParcelDetailsPickUpPage from "./pages/crowdshipper-pick-up/ParcelDetailsPickUp";
import ParcelPickUpCodePage from "./pages/crowdshipper-pick-up/ParcelPickUpCodePage";
import ParcelValidationPage from "./pages/parcel-validation/ParcelValidationPage";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      secondary: {
        main: "#374151", // Couleur secondaire
      },
      background: {
        default: "#18212F", // Couleur de fond
      },
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundColor: "#18212F", // Couleur de fond pour DataGrid
            border: "1px solid #374151", // Couleur des bordures
          },
          columnHeader: {
            backgroundColor: "#18212F", // Couleur des en-têtes
          },
          footerContainer: {
            backgroundColor: "#18212F", // Couleur du footer
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Applique les styles globaux du thème */}
      <AppProvider>
        <div>
          <Routes>
            <Route
              path="/test"
              element={<TestComponent />}
            />
            <Route
              path="/connexion"
              element={<LoginPage />}
            />
            <Route
              path="/reset-password"
              element={<ResetPasswordPage />}
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<OverviewPage />}
              />
              <Route
                path="/crowdshipper-retrait-colis-details/:parcelId"
                element={<ParcelDetailsPickUpPage />}
              />
              <Route
                path="/crowdchipper-retrait-colis-code"
                element={<ParcelPickUpCodePage />}
              />
              <Route
                path="/colis"
                element={<ParcelsPage />}
              />
              <Route
                path="/colis"
                element={<ParcelsPage />}
              />
              <Route
                path="/colis/:parcelId"
                element={<ParcelEditEmbeddedPage />}
              />
              <Route
                path="/nouveau-colis"
                element={<ParcelCreatePage />}
              />
              <Route
                path="/parametres"
                element={<SettingsPage />}
              />

              <Route
                path="/valider-livraisons/:relayPointId"
                element={<ParcelValidationPage />}
              />

              <Route
                path="/aide"
                element={<GuidePage />}
              />
            </Route>
          </Routes>
        </div>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
