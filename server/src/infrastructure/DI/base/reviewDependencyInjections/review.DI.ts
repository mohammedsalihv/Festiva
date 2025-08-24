import { ReviewRepository } from "../../../repositories/base/reviewRepositories/repository.review";
import { ReviewController } from "../../../../adapters/controllers/base/reviewControllers/review.controller";
import { ReviewUseCase } from "../../../../application/usecases/base/reviewUsecase/usecase.review";
import { userServiceBaseController } from "../../user/userServiceDependencyInjections/userServiceBase.DI";

const reviewRepository = new ReviewRepository();
const reviewUseCase = new ReviewUseCase(reviewRepository);
const reviewController = new ReviewController(
  reviewUseCase,
  userServiceBaseController
);
export { reviewController };
