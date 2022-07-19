import { useRecoilState } from "recoil";
import { domainSearchState } from "../atoms/domainSearchState";

export const useDomainSearch = () => {
  return useRecoilState(domainSearchState);
};
