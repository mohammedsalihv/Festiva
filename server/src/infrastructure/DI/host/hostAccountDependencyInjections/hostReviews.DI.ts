import { HostReviewsRepository } from "../../../repositories/host/hostAccountRepositories/repository.hostReviews";
import { HostReviewsUseCase } from "../../../../application/usecases/host/hostAccountUsecases/usecase.hostReviews";
import { HostReviewsController } from "../../../../adapters/controllers/host/hostAccountControllers/hostReviews.controller";

const hostReviewsRepository = new HostReviewsRepository();
const hostReviewsUseCase = new HostReviewsUseCase(hostReviewsRepository);
const hostReviewsController = new HostReviewsController(hostReviewsUseCase);

export { hostReviewsController };
