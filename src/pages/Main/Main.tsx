import { ArticlesList, PopularArticles } from "@/features";
import Image from "@/shared/assets/image.png";

import { StyledBox, StyledContainer, StyledImage } from "./Main.module";

export const Main = () => {
  return (
    <>
      <StyledContainer>
        <StyledImage srcSet={Image} src={Image} alt='Image' loading='lazy' />
        <StyledBox>
          <ArticlesList />
          <PopularArticles />
        </StyledBox>
      </StyledContainer>
    </>
  );
};
