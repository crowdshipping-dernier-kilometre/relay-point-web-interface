import { createContext } from "react";
import { AuthService } from "../api/AuthService";
import { ParcelService } from "../api/ParcelService";
const AppContext = createContext({});
const { Provider } = AppContext;

const AppProvider = ({ children }) => {
  const services = {
    authService: new AuthService(),
    parcelService: new ParcelService(),
  };
  return <Provider value={services}>{children}</Provider>;
};
export { AppContext, AppProvider };
