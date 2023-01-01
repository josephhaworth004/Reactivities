// A MobX store to store all stores

import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    activityStore: ActivityStore // ActivityStore is a class from activityStore.ts but it can also be a type
}

export const store: Store = { // Export a store of type store
    // Object of type ActivityStore()
    // Returns an object with an activityStore inside.
    activityStore: new ActivityStore() 
}

// Create a react context
// store: Store will be contained in out context
export const StoreContext = createContext(store); // createContext is from from react not vm

// Simple React hook

export function useStore() {
    return useContext(StoreContext);
}

// After this provide our context to app by updating index.tsx