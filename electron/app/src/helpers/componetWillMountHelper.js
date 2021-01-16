import { useMemo } from 'react';

export const useComponentWillMount = (func) => {
    console.log("connecting in helper")
    useMemo(func, [])
}