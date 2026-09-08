import { Request, Response } from "express"

export const greetingSpecific = async (req: Request, res: Response) => {
    const username = req.params.username

    res.json({message: `Hello ${username}, welcome to your admin panel!`})
}