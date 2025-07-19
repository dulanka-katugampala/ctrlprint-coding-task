import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, TextField } from "@mui/material";
import { useCallback, useMemo } from "react";

const commentSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z ]+$/, "Letters and spaces only"),
  body: z.string().min(1, "Comment is required"),
});

export type CommentFormData = z.infer<typeof commentSchema>;
interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void;
  onCancel?: () => void;
  defaultValues?: CommentFormData | null;
  loading?: boolean;
}

const defaultValuesEmpty: CommentFormData = {
  email: "",
  name: "",
  body: "",
};

export function CommentForm({
  onSubmit,
  defaultValues,
  loading,
  onCancel,
}: CommentFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
    defaultValues: defaultValues || defaultValuesEmpty,
  });

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
    () => (defaultValues ? "Edit Comment" : "Add Comment"),
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
          label="Email"
          type="email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
          {...register("email")}
        />
        <TextField
          label="Name"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
          {...register("name")}
        />
        <TextField
          label="Comment"
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
