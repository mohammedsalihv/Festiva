import { ReviewRepository } from "../../../repositories/base/baseReviewRepositories/repository.review";
import { ReviewController } from "../../../../adapters/controllers/base/baseReviewControllers/review.controller";
import { ReviewUseCase } from "../../../../application/usecases/base/baseReviewUsecase/usecase.review";
import { userServiceBaseController } from "../../userDependencyInjections/userServicesDependencyInjections/userServiceBase.DI";
import { HostNotificationRepository } from "../../../repositories/host/hostAccountRepositories/repository.hostNotification";
import { HostNotificationUseCase } from "../../../../application/usecases/host/hostAccountUsecases/usecase.hostNotification";

const reviewRepository = new ReviewRepository();
const hostNotificationRepository = new HostNotificationRepository();
const reviewUseCase = new ReviewUseCase(reviewRepository);
const hostNotificationUseCase = new HostNotificationUseCase(
  hostNotificationRepository
);
const reviewController = new ReviewController(
  reviewUseCase,
  userServiceBaseController,
  hostNotificationUseCase
);
export { reviewController };
