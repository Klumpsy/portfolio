
import { RootState } from "@/store/store";
import { PayloadAction } from "@reduxjs/toolkit";

export interface TimelineEntry {
  action: PayloadAction;
  state: RootState;
}

export interface ActiveBlocks {
  action: boolean;
  reducer: boolean;
  store: boolean;
}