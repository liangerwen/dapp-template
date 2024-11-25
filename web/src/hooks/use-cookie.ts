import {
  useCallback,
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import Cookies from "js-cookie";
import { parse, stringify } from "@/lib/utils";

export function useCookie<T>(key: string, initialValue: T) {
  const [store, setStore] = useState<T>(initialValue);

  const setState = useCallback<Dispatch<SetStateAction<T>>>(
    (v) => {
      try {
        // @ts-ignore
        const val = typeof v === "function" ? v(store) : v;
        if (val === null || val === undefined) {
          Cookies.remove(key);
        } else {
          Cookies.set(key, stringify(val));
        }
        setStore(val);
      } catch (e) {
        console.warn(e);
      }
    },
    [key, store]
  );

  useEffect(() => {
    const v = Cookies.get(key);
    if (v) {
      setStore(parse(v));
    } else if (typeof initialValue !== "undefined") {
      Cookies.set(key, stringify(initialValue));
    }
  }, [key, initialValue]);

  return [store, setState] as const;
}
