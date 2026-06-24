import { useSyncExternalStore } from "react";
import ko from "./ko.json";
import en from "./en.json";

let langCode = "KOR";
const listeners = new Set();

function subscribe(cb) {
    listeners.add(cb);
    return () => listeners.delete(cb);
}

export function setLangCode(code) {
    if (langCode === code) return;
    langCode = code;
    listeners.forEach((l) => l());
}

const getT = () => (langCode === "KOR" ? ko : en);
const getLangCode = () => langCode;

export function useT() {
    return useSyncExternalStore(subscribe, getT, getT);
}

export function useLangCode() {
    return useSyncExternalStore(subscribe, getLangCode, getLangCode);
}

export { ko, en };
