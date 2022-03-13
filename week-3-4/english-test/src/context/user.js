import { createContext } from "react";

// initial UserContext value
export const UserContext = createContext({user:null, setUser:()=>{}});
