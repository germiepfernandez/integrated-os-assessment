import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
