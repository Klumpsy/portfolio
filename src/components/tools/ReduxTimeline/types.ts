import { RootState } from "@/store/store";
import { PayloadAction } from "@reduxjs/toolkit";

export interface ReduxTimelineProps {
    action: PayloadAction;
    state: RootState, 
    index: number;
    currentIndex: number;
    onClick: () => void;
}