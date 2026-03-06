import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/scrollbar";
import { Keyboard, Scrollbar } from "swiper/modules";
import "./ReviewsSlider.css";

export default function ReviewsSlider({ reviews }) {
  if (!reviews || reviews.length === 0) return "";

  const totalReviews = reviews.length;
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

  // Count number of reviews per rating
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) => reviews.filter((r) => r.rating === star).length,
  );
  return (
    <div>
      <h4 className="head-rating">Rating & Reviews</h4>{" "}
      <div className="row justify-content-center align-items-center g-3">
        <div className="rating-summary col-12 col-md-8">
          <div className="rating-main row g-2 align-items-center justify-content-center">
            <div className="average-rating col-5 col-md-4  ">
              <div className="d-flex justify-content-center align-items-center ">
                <span className="avg-number display-1">{avgRating.toFixed(1)}</span>
                <span className="slash ">/5</span>
              </div>
              <span className="review-count">({totalReviews} Reviews)</span>
            </div>
            <div className="rating-bars col-7 col-md-8">
              {ratingCounts.map((count, index) => {
                const star = 5 - index;
                const percent = (count / totalReviews) * 100;
                return (
                  <div key={star} className="rating-bar">
                    <span className="star g-1 d-flex align-items-center justify-content-center">
                      <p className="m-0 fs-5">{star}</p>
                      <i className="fa-solid fa-star "></i>
                    </span>
                    <div className="bar-bg">
                      <div
                        className="bar-fill"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className=" col-12 col-md-4">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            slidesPerGroupSkip={1}
            grabCursor={true}
            keyboard={{ enabled: true }}
            scrollbar={{ draggable: true }}
            modules={[Keyboard, Scrollbar]}
            className="reviewsSwiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="review-card">
                  <div>
                    <div className="review-header">
                      <strong className="review-user">
                        {review.user.name}
                      </strong>
                      <small className="review-date">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    <span className="review-rating">
                      {Array.from({ length: 5 }, (_, i) => {
                        if (i < review.rating)
                          return <i key={i} className="fa-solid fa-star"></i>;
                        return <i key={i} className="fa-regular fa-star"></i>;
                      })}
                    </span>
                  </div>

                  <p className="review-text">{review.review}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
