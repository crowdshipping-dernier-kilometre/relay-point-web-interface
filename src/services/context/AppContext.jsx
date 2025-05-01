import { createContext } from "react";
import { AuthService } from "../api/AuthService";
import { OrientationCourseService } from "../api/OrientationCourseService";
import { ParcelService } from "../api/ParcelService";
const AppContext = createContext({});
const { Provider } = AppContext;

const AppProvider = ({ children }) => {
  const services = {
    authService: new AuthService(),
    orientationCourseService: new OrientationCourseService(),
    parcelService: new ParcelService(),
    // categoryService: new CategoryService(),
  };
  return <Provider value={services}>{children}</Provider>;
};
export { AppContext, AppProvider };
