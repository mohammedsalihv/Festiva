import express from "express";
import { userAdminController } from "../../../infrastructure/frameworks/DependencyInjection/admin/UserManagement.dependancyContainer";
import { hostAdminController } from "../../../infrastructure/frameworks/DependencyInjection/admin/HostManagement.dependancyContainer";

const adminRoutes = express.Router();


// User Management
adminRoutes.get("/getAllUsers", userAdminController.getUsers.bind(userAdminController));
adminRoutes.patch("/users/:userId/blockUnblock", userAdminController.blockOrUnblockUser.bind(userAdminController));
adminRoutes.patch("/users/:userId/edit", userAdminController.editUser.bind(userAdminController));




// host management
adminRoutes.get("/getAllHosts", hostAdminController.getHosts.bind(hostAdminController));
adminRoutes.patch("/hosts/:hostId/blockUnblock", hostAdminController.blockOrUnblockHost.bind(hostAdminController));
adminRoutes.patch("/hosts/:hostId/edit", hostAdminController.editHost.bind(hostAdminController));


export default adminRoutes;
