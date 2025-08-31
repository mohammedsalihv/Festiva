import { HostReviewsRepository } from "../../../repositories/host/hostAccountRepositories/repository.hostReviews";
import { HostReviewsUseCase } from "../../../../application/usecases/host/hostAccountUsecases/usecase.hostReviews";
import { UserRepository } from "../../../repositories/user/userBaseRepositories/repository.user";
import { HostReviewsController } from "../../../../adapters/controllers/host/hostAccountControllers/hostReviews.controller";

const hostReviewsRepository = new HostReviewsRepository();
const userRepository = new UserRepository();
const hostReviewsUseCase = new HostReviewsUseCase(
  hostReviewsRepository,
  userRepository
);
const hostReviewsController = new HostReviewsController(hostReviewsUseCase);

export { hostReviewsController };
