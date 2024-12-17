import { Request, Response } from "express";
import ResetPasswordService from "../services/ResetPasswordService";

export default class ResetPasswordController {
  async create(request: Request, response: Response): Promise<Response>{
    const { password, token } = request.body;

    const resetPassoword = new ResetPasswordService();

    await resetPassoword.execute({
      password,
      token,
    });

    return response.status(204).json()
  }
}