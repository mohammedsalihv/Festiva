import { Request, Response } from "express";
import { IUserProfileController } from "../../../../domain/controllerInterfaces/userControllerInterfaces/userAccountControllerInterfaces/interface.userProfileController";
import { IUserProfileUseCase } from "../../../../domain/usecaseInterface/user/userProfileUsecaseInterfaces/interface.userProfileUseCase";
import logger from "../../../../utils/baseUtilities/messages/logger";
import { JwtPayload } from "jsonwebtoken";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import { uploadProfileImage } from "../../../../utils/baseUtilities/cloudinary/uploadProfileImage";
import { authenticationRequest } from "../../../../domain/controllerInterfaces/baseControllerInterfaces/baseAuthenticationInterfaces/authRequest";

interface MulterRequest extends Request {
  file: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class UserProfileController implements IUserProfileController {
  constructor(private _userProfileUseCase: IUserProfileUseCase) {}

  async setProfilePic(req: MulterRequest, res: Response): Promise<void> {
    try {
      const userId = req.auth?.id;
      const file = req.file;

      if (!file) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "No image file uploaded.",
        });
        return;
      }

      if (!userId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Unauthorized. No user ID found in request.",
        });
        return;
      }

      const image = await uploadProfileImage({
        id: userId,
        buffer: file.buffer,
      });

      const updatedUser = await this._userProfileUseCase.execute(
        userId,
        image.url
      );

      res.status(statusCodes.Success).json({
        success: true,
        message: "Profile image changed!",
        data: {
          profilePhotoUrl: updatedUser.profilePic,
          ...updatedUser,
        },
      });
    } catch (error: any) {
      logger.error("Profile change Error:", error);

      if (error.message === "User not found") {
        res.status(statusCodes.notfound).json({
          success: false,
          message: "User not found",
        });
        return;
      }
      res.status(statusCodes.serverError).json({
        success: false,
        message: error.message,
      });
    }
  }

  async profileEdit(req: authenticationRequest, res: Response): Promise<void> {
    const userId = req.auth?.id;
    const formData = req.body;
    if (!userId) {
      res.status(statusCodes.unAuthorized).json({
        success: false,
        message: "Missing userId",
      });
      return;
    }
    if (!formData) {
      res.status(statusCodes.forbidden).json({
        success: false,
        message: "Missing form data",
      });
      return;
    }
    try {
      const response = await this._userProfileUseCase.profileEdit(
        userId,
        formData
      );
      res.status(statusCodes.Success).json({
        message: "Profile updated!",
        success: true,
        data: response,
      });
    } catch (error) {
      logger.error(String(error), "Error updating profile");

      const statusCode = (error as any)?.statusCode || statusCodes.serverError;
      const message = (error as any)?.message || "Failed to update profile";

      res.status(statusCode).json({
        success: false,
        message,
      });
    }
  }

  async validateMail(req: authenticationRequest, res: Response): Promise<void> {
    const { email } = req.params;
    if (!email) {
      res.status(statusCodes.unAuthorized).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    try {
      await this._userProfileUseCase.validateEmail(email);
      res.status(statusCodes.Success).json({
        success: true,
        message: "Email is available",
      });
    } catch (error) {
      const statusCode = (error as any)?.statusCode;
      const message = (error as any)?.message;

      res.status(statusCode).json({
        success: false,
        message: message || statusMessages.accountExisted,
      });
    }
  }

  async passwordModify(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    const userId = req.auth?.id;
    const formData = req.body;

    if (!userId) {
      res
        .status(statusCodes.unAuthorized)
        .json({ success: false, message: "Missing userId" });
      return;
    }

    if (!formData) {
      res
        .status(statusCodes.forbidden)
        .json({ success: false, message: "Missing form data" });
      return;
    }

    try {
      const response = await this._userProfileUseCase.passwordModify(
        userId,
        formData
      );
      res
        .status(statusCodes.Success)
        .json({ message: "Password changed!", success: true, data: response });
    } catch (error) {
      logger.error(String(error), "Error while changing password");
      const statusCode = (error as any)?.statusCode || statusCodes.serverError;
      const message = (error as any)?.message || statusMessages.serverError;
      res.status(statusCode).json({ success: false, message });
    }
  }

  async deleteProfile(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    const userId = req.auth?.id;

    if (!userId) {
      res.status(statusCodes.unAuthorized).json({
        success: false,
        message: "Missing or invalid userId",
      });
      return;
    }

    try {
      const isDeleted = await this._userProfileUseCase.deleteProfile(userId);
      if (!isDeleted) {
        res.status(statusCodes.notfound).json({
          success: false,
          message: "User not found or already deleted",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "User account deleted successfully",
      });
    } catch (error) {
      logger.error(String(error), "Error deleting user");
      res.status(statusCodes.serverError).json({
        success: false,
        message: "Error while deleting the account",
      });
    }
  }
}
