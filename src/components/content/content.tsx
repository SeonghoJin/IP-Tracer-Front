import { FC, useState } from "react";
import styled from "styled-components";
import { Search } from "../search/search";
import { TextLogo } from "../textlogo/textlogo";
import { Description } from "../description/description";
import "./content.css";
import { RouteData } from "../routedata/routeData";

const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchLayout = styled.div`
  margin-top: 40px;
`;

export const ContentGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 30%;
`;

export const Content: FC = () => {
  const [searchingFlag, setSearchingFlag] = useState<boolean>(false);

  return (
    <ContentWrapper>
      <ContentGroupWrapper
        className={`ContentWrapper ${searchingFlag && "active"}`}
      >
        <TextLogo searchingFlag={searchingFlag} />
        <Description searchingFlag={searchingFlag} />
        <SearchLayout>
          <Search
            setSearchingFlag={setSearchingFlag}
            searchFlag={searchingFlag}
          />
        </SearchLayout>
      </ContentGroupWrapper>
      <RouteData
        searchingFlag={searchingFlag}
        setSearchingFlag={setSearchingFlag}
      />
    </ContentWrapper>
  );
};
