import { Request, Response } from "express"
import { ZodError } from "zod"
import { BaseError } from "../errors/BaseError"
import { GetVideosInputDTO, GetVideosOutputDTO } from "../dtos/video/getVideos.dto"
import { CreateVideoOutputDTO, CreateVideoSchema } from "../dtos/video/createVideo.dto"
import { VideoBusiness } from "../business/VideoBusiness"

export class VideoController {
  constructor(
    private videoBusiness: VideoBusiness
  ) {}

  public getVideos = async (req: Request, res: Response) => {
    try {

      const input: GetVideosInputDTO = undefined
      const output: GetVideosOutputDTO = await this.videoBusiness.getVideos(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else {
        res.status(500).send("Erro inesperado.")
      }
    }
  }

  public createVideo = async (req: Request, res: Response) => {
    try {
      
      const input = CreateVideoSchema.parse({
        id: req.body.id,
        creatorId: req.body.creatorId,
        title: req.body.title,
        thumbnailImgUrl: req.body.thumbnailImgUrl,
        videoUrl: req.body.videoUrl
      })

      const output: CreateVideoOutputDTO = await this.videoBusiness.createVideo(input)

      res.status(201).send(output)

    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else {
        res.status(500).send("Erro inesperado.")
      }
    }
  }
}