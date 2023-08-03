import express from "express"
import { VideoController } from "../controller/VideoController"
import { VideoBusiness } from "../business/VideoBusiness"
import { VideoDatabase } from "../database/VideoDatabase"
import { UserDatabase } from "../database/UserDatabase"

export const videoRouter = express.Router()

const videoController = new VideoController(
  new VideoBusiness(
    new VideoDatabase(),
    new UserDatabase()
  )
)

videoRouter.get("/", videoController.getVideos)
videoRouter.post("/", videoController.createVideo)
