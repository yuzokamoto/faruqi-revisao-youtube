import { VideoDB } from "../models/Video";
import { BaseDatabase } from "./BaseDatabase";

export class VideoDatabase extends BaseDatabase {
  public static TABLE_VIDEOS = "videos"

  public getAllVideos = async (): Promise<VideoDB[]> => {
    const response: VideoDB[] = await BaseDatabase
      .connection(VideoDatabase.TABLE_VIDEOS)
      .select()
    
    return response
  }

  public insertVideo = async (videoDB: VideoDB): Promise<void> => {
    await BaseDatabase
      .connection(VideoDatabase.TABLE_VIDEOS)
      .insert(videoDB)
  }
}