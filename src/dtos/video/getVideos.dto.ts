import z from "zod"
import { VideoModel } from "../../models/Video"

export type GetVideosInputDTO = undefined

export type GetVideosOutputDTO = VideoModel[]

// export const getVideosSchema = z.object({})