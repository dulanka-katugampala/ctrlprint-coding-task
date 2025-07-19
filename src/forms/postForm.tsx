import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, TextField } from "@mui/material";

const postSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .regex(/^[a-zA-Z0-9 ]+$/, "Alphanumeric only"),
  body: z.string().min(1, "Body is required"),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostFormProps {
  onSubmit: (data: PostFormData) => void;
  defaultValues?: PostFormData;
}

const defaultValuesEmpty: PostFormData = {
  title: "",
  body: "",
};

export function PostForm({ onSubmit, defaultValues }: PostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: defaultValues || defaultValuesEmpty,
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4 }}>
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
      <Button type="submit" variant="contained" disabled={!isValid}>
        Add Post
      </Button>
    </Box>
  );
}
