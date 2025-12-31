import { useContext } from "react";
import { CustomerContext } from "./CustomerContextConfig";

export const useCustomers = () => useContext(CustomerContext);
