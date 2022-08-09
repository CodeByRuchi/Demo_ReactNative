import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./sagaSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/Saga";

const SagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer : {
        pokemon : pokemonSlice,
    },
    middleware : [SagaMiddleware]
});

SagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;