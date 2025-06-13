import { Request, Response } from "express";
import { registerHostDTO } from "../../../../config/DTO/host/dto.host";
import { RegsiterHost } from "../../../../application/use-cases/host/Auth/registerHost";
import logger from "../../../../utils/common/messages/logger";

export class HostRegisterController {
  constructor(private registerHost: RegsiterHost) {}

  async hostRegister(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, password, location } = req.body;

      if (!name || !email || !phone || !password || !location) {
        res.status(400).json({ message: "All fields are required." });
        return;
      }
      const hostData: registerHostDTO = {
        name,
        email,
        phone,
        password,
        location,
      };

      const { host, accessToken, refreshToken } =
        await this.registerHost.execute(hostData);

      res.status(200).json({
        success: true,
        message: "Registered successfully",
        host: {
          id: host.id,
          name: host.name,
          phone: host.phone,
          email: host.email,
          location: host.location,
          role: host.role,
        },
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      logger.error("Error during registration:", error.message);

      if (error.response) {
        res
          .status(error.response.status)
          .json({ message: error.response.data.message });
      } else if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Something went wrong." });
      }
    }
  }
}
