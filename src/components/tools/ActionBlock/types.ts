import { PayloadAction } from "@reduxjs/toolkit";

export interface ActionBlockProps {
    isActive: boolean;
    currentAction: PayloadAction | null
}