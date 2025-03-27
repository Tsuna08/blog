import { ArticlesList } from "@/features/ArticlesList";
import Image from "@/shared/assets/image.png";

import { StyledImage } from "./Main.module";

export const Main = () => {
  return (
    <>
      <StyledImage srcSet={Image} src={Image} alt='Image' loading='lazy' />
      <ArticlesList />
    </>
  );
};
