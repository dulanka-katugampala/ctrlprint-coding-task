import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, TextField } from "@mui/material";

const commentSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z ]+$/, "Letters and spaces only"),
  body: z.string().min(1, "Comment is required"),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void;
  defaultValues?: CommentFormData;
}

const defaultValuesEmpty: CommentFormData = {
  email: "",
  name: "",
  body: "",
};

export function CommentForm({ onSubmit, defaultValues }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
    defaultValues: defaultValues || defaultValuesEmpty,
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4 }}>
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
      <Button type="submit" variant="contained" disabled={!isValid}>
        Add Comment
      </Button>
    </Box>
  );
}
