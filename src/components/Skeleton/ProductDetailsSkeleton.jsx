import { Skeleton, Box } from "@mui/material";

export default function ProductDetailsSkeleton() {
  return (
    <div className="row g-5">
      {/* Image Section */}
      <div className="col-md-5">
        <Box>
          <Skeleton
            variant="rectangular"
            height={450}
            animation="wave"
            sx={{ borderRadius: "12px" }}
          />

          <div className="d-flex gap-2 mt-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="23%"
                height={80}
                animation="wave"
                sx={{ borderRadius: "8px" }}
              />
            ))}
          </div>
        </Box>
      </div>

      {/* Info Section */}
      <div className="col-md-7">
        <Skeleton variant="text" height={40} width="60%" animation="wave" />
        <Skeleton variant="text" height={35} width="40%" animation="wave" />
        <Skeleton
          variant="rectangular"
          height={45}
          width="100%"
          animation="wave"
          sx={{ borderRadius: "8px", mt: 2 }}
        />
      </div>
    </div>
  );
}
