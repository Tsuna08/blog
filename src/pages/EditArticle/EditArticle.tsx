import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { generatePath, useNavigate, useParams } from "react-router-dom";

import { routers } from "@/app/routers";
import { EditArticleForm } from "@/features";
import { Title } from "@/shared/components";
import { IconButton } from "@/shared/components/IconButton";

export const EditArticle = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  return (
    <>
      <Box display='flex' justifyContent='space-between'>
        <Title>Редактирование статьи</Title>
        <IconButton
          icon={<CloseIcon />}
          ariaLabel='back icon'
          onClick={() => navigate(generatePath(routers.article, { id: id }))}
        />
      </Box>
      <EditArticleForm />
    </>
  );
};
