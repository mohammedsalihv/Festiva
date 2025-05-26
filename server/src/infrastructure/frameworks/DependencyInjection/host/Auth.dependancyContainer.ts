// Controller

import { HostLoginController } from "../../../../Presentation/controllers/host/auth/hostLogin.controller";
import { HostRegisterController } from "../../../../Presentation/controllers/host/auth/hostRegister.controller";
import { RefreshTokenController } from "../../../../Presentation/controllers/user/auth/refreshToken.controller";

// use-case

import { RegsiterHost } from "../../../../application/use-cases/host/Auth/registerHost";
import { LoginHost } from "../../../../application/use-cases/host/Auth/loginHost";

// repositories

import { HostLoginRepository } from "../../../repositories/host/auth/repository.hostLogin";
import { HostRegisterRepository } from "../../../repositories/host/auth/repository.hostRegister";
import { HostRepository } from "../../../repositories/host/auth/repository.host";

// Instantiating Repositories

const hostRegisterRepository = new HostRegisterRepository();
const hostLoginRepository = new HostLoginRepository();
const hostRepository = new HostRepository();

// Instantiating use-case

const registerHost = new RegsiterHost(hostRegisterRepository , hostRepository);
const loginHost = new LoginHost(hostLoginRepository,hostRepository);

// Instantiating controllers

const hostRegisterController = new HostRegisterController(registerHost);
const hostLoginController = new HostLoginController(loginHost);
const refreshTokenController = new RefreshTokenController();

export { hostRegisterController, hostLoginController, refreshTokenController };
