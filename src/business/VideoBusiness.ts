import { UserDatabase } from "../database/UserDatabase";
import { VideoDatabase } from "../database/VideoDatabase";
import { CreateVideoInputDTO, CreateVideoOutputDTO } from "../dtos/video/createVideo.dto";
import { GetVideosInputDTO, GetVideosOutputDTO } from "../dtos/video/getVideos.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { Video, VideoModel } from "../models/Video";

export class VideoBusiness {
  constructor(
    private videoDatabase: VideoDatabase,
    private userDatabase: UserDatabase
  ) { }

  public getVideos
    = async (input: GetVideosInputDTO): Promise<GetVideosOutputDTO> => {
      const videosDB = await this.videoDatabase.getAllVideos()

      const videosModel: VideoModel[] = []

      for (let videoDB of videosDB) {

        const creatorDB = await this.userDatabase.findUserById(videoDB.creator_id)

        if (!creatorDB) {
          throw new BadRequestError("Vídeo com criador não identificado.")
        }

        const video = new Video(
          videoDB.id,
          videoDB.title,
          videoDB.thumbnail_img_url,
          videoDB.video_url,
          videoDB.likes,
          videoDB.dislikes,
          videoDB.created_at,
          videoDB.creator_id,
          creatorDB.username,
          creatorDB.profile_img_url
        )

        videosModel.push(video.toVideoModel())
      }

      const output: GetVideosOutputDTO = videosModel
      return output
    }

  public createVideo
    = async (input: CreateVideoInputDTO): Promise<CreateVideoOutputDTO> => {
      const {
        id,
        creatorId,
        title,
        thumbnailImgUrl,
        videoUrl
      } = input

      const creatorDB = await this.userDatabase.findUserById(creatorId)

      if (!creatorDB) {
        throw new BadRequestError("Criador não existe.")
      }

      const video = new Video(
        id,
        title,
        thumbnailImgUrl,
        videoUrl,
        0,
        0,
        new Date().toISOString(),
        creatorId,
        creatorDB.username,
        creatorDB.profile_img_url
      )

      await this.videoDatabase.insertVideo(video.toVideoDB())

      const output: CreateVideoOutputDTO = undefined
      return output
    }
}