import { useCallback, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

const postSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .regex(/^[a-zA-Z0-9 ]+$/, "Alphanumeric only"),
  body: z.string().min(1, "Body is required"),
});

export type PostFormData = z.infer<typeof postSchema>;

interface PostFormProps {
  onSubmit: (data: PostFormData) => void;
  onCancel?: () => void;
  defaultValues?: PostFormData | null;
  loading?: boolean;
}

const defaultValuesEmpty: PostFormData = {
  title: "",
  body: "",
};

export function PostForm({
  onSubmit,
  defaultValues,
  loading,
  onCancel,
}: PostFormProps) {
  const formConfig = useMemo(
    () => ({
      resolver: zodResolver(postSchema),
      mode: "onChange" as const,
      defaultValues: defaultValues || defaultValuesEmpty,
    }),
    [defaultValues]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<PostFormData>(formConfig);

  const handleCancel = useCallback(() => {
    reset();
    onCancel?.();
  }, [reset, onCancel]);

  const handleOnSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(onSubmit)(e);
    },
    [handleSubmit, onSubmit]
  );

  const submitButtonText = useMemo(
    () => (defaultValues ? "Update Post" : "Create Post"),
    [defaultValues]
  );

  return (
    <Box
      component="form"
      display="flex"
      height="100%"
      flexDirection="column"
      onSubmit={handleOnSubmit}
    >
      <Box flexGrow={1}>
        <TextField
          label="Title"
          fullWidth
          error={!!errors.title}
          helperText={errors.title?.message}
          margin="normal"
          {...register("title")}
        />
        <TextField
          label="Body"
          fullWidth
          error={!!errors.body}
          helperText={errors.body?.message}
          multiline
          rows={4}
          margin="normal"
          {...register("body")}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button fullWidth onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={!isValid}
          loading={loading}
        >
          {submitButtonText}
        </Button>
      </Box>
    </Box>
  );
}
