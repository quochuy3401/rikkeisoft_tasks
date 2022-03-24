import { createContext } from "react";

// initial UserContext value
export const ExamContext = createContext({exam:null, setExam:()=>{}});