// Controller

import { HostLoginController } from "../../../../Presentation/controllers/host/auth/hostLogin.controller";
import { HostRegisterController } from "../../../../Presentation/controllers/host/auth/hostRegister.controller";
import { RefreshTokenController } from "../../../../Presentation/controllers/user/auth/refreshToken.controller";

// use-case

import { RegsiterHost } from "../../../../application/use-cases/host/Auth/registerHost";
import { LoginHost } from "../../../../application/use-cases/host/Auth/loginHost";

// repositories

import { HostLoginRepository } from "../../../repositories/host/auth/hostLogin.repository";
import { HostRepository } from "../../../repositories/host/auth/hostRegister.repository";

// Instantiating Repositories

const hostRepository = new HostRepository();
const hostLoginRepository = new HostLoginRepository();

// Instantiating use-case

const registerHost = new RegsiterHost(hostRepository);
const loginHost = new LoginHost(hostLoginRepository);

// Instantiating controllers

const hostRegisterController = new HostRegisterController(registerHost);
const hostLoginController = new HostLoginController(loginHost);
const refreshTokenController = new RefreshTokenController();

export { hostRegisterController, hostLoginController, refreshTokenController };
