import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/app/providers/AuthProvider";
import { routers } from "@/app/routers";
import { useAddArticleMutation } from "@/entities/Article";
import Arrow from "@/shared/assets/arrow.svg";
import { Button, TextInput } from "@/shared/components";

import { articleSchema, defaultValues, prepareFormValues } from "../lib/formProps";
import { IArticleForm } from "../types/articleForm";

export const CreateArticleForm = () => {
  const [addArticle, { isLoading }] = useAddArticleMutation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IArticleForm>({
    defaultValues: defaultValues,
    resolver: yupResolver(articleSchema),
  });

  const onSubmit = (data: IArticleForm) => {
    addArticle(prepareFormValues(data, user)).then(() => navigate(routers.root));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='title'
        control={control}
        render={({ field }) => (
          <TextInput
            label='Заголовок'
            error={!!errors.title}
            helperText={errors?.title?.message}
            disabled={isLoading}
            type='text'
            {...register("title", { required: true })}
            {...field}
          />
        )}
      />
      <Controller
        name='context'
        control={control}
        render={({ field }) => (
          <TextInput
            label='Сообщение'
            error={!!errors.context}
            helperText={errors?.context?.message}
            rows={15}
            disabled={isLoading}
            multiline
            type='text'
            {...register("context")}
            {...field}
          />
        )}
      />
      <Button
        type='submit'
        fullWidth
        sx={{ mt: 2 }}
        disabled={isLoading}
        endIcon={<img height={15} src={Arrow} alt='Arrow' />}
      >
        Опубликовать
      </Button>
    </form>
  );
};
