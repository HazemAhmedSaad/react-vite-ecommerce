import { Skeleton, Box } from "@mui/material";
export default function CategorySkeleton() {
  return (
    <Box className="px-2">
      {/* Image Skeleton */}
      <Skeleton
        variant="rectangular"
        height={200}
        animation="wave"
        sx={{ borderRadius: "12px" }}
      />

      {/* Text Skeleton */}
      <Skeleton
        variant="text"
        height={30}
        width="60%"
        animation="wave"
        sx={{ margin: "auto", mt: 1 }}
      />
    </Box>
  );
}
