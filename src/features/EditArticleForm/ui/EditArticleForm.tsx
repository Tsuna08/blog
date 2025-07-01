import { yupResolver } from "@hookform/resolvers/yup";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { routers } from "@/app/routers";
import { useGetArticleQuery, useUpdateArticleMutation } from "@/entities/Article";
import Arrow from "@/shared/assets/arrow.svg";
import { Button, TextInput } from "@/shared/components";

import { articleSchema, getDefaultValue, prepareFormValues } from "../lib/formProps";
import { IArticleForm } from "../types/articleForm";

export const EditArticleForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: article, isLoading } = useGetArticleQuery(id ?? skipToken);
  const [editArticle] = useUpdateArticleMutation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IArticleForm>({
    defaultValues: article && getDefaultValue(article),
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(articleSchema),
  });

  useEffect(() => {
    if (article) reset(getDefaultValue(article));
  }, [article, reset]);

  const onSubmit = (data: IArticleForm) => {
    if (article) {
      editArticle(prepareFormValues(data, article)).then(() => navigate(routers.root));
    }
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
            label='Статья'
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
        Отредактировать
      </Button>
    </form>
  );
};
