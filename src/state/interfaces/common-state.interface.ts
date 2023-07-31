import { SerializedError } from "@reduxjs/toolkit";
import { Status } from "interfaces/statuses";

export interface ICommonState {
  status: Status;
  error: Error | SerializedError | null;
}

export const initialCommonState: ICommonState = {
  status: Status.INITIAL,
  error: null,
};

export type FetchedData<T> = { value: T };
export type PagedData<T> = { hasMore: boolean } & FetchedData<T>;
