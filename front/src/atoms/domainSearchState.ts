import { atom } from "recoil";

export const domainSearchState = atom<{
    searching: boolean,
    search: string
}>({
    key: "domainSearchState",
    default: {
        searching: false,
        search: ''
    },
});
