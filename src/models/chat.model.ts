
export enum EnumTypeMessageInLocal {
  Message = "Message",
  Media = "Media",
  Link = "Link",
  File = "File"
}

export enum EnumMessageStatus {
  Pending = "pending",
  Send = "send",
  Read = "read",
  Fail = "fail"
}

export enum EnumTypeMessage {
  Text = "Text",
  Media = "Media",
  Audio = "Audio",
  Link = "Link",
  File = "File",
}

export enum EnumMediaTypeFile {
  Video = "video",
  Image = "image",
  Link = "link",
  File = "file",
  Audio = "audio"
}

export interface TypeDataCreateChatRoom {
  partner_id: string
  chat_type: string
}


export interface TypedChatHistory {
  _id?: string
  user_type?: string
  parent_id?: number
  chat_room_id?: string
  chat_content?: string
  chat_audio?: []
  chat_video?: []
  chat_link?: []
  chat_image?: []
  chat_file?: []
  media_ids?: TypedDataMediaChatHistory[]
  chat_type?: string
  chat_status?: EnumMessageStatus;
  send_at?: string
  read_at?: string
  createdAt?: string
  updatedAt?: string
  createBy?: {
    user_id?: string;
    _id?: string;
    user_login?: string;
    user_avatar?: string;
    display_name?: string;
    user_status?: number;
    user_role?: string;
    last_active?: string;
    user_active?: number;
    user_avatar_thumbnail?: string
  }
  media_data?: string;
  media_modal?: any
  system?: boolean

  //Local attributes
  message_type?: EnumTypeMessage;
  local_id?: string;
  local_data_media?: TypedDataMediaChatHistory[];
}

export interface TypedMediaDataChatHistory {
  id: string;
  status: number;
}

export interface TypedCreateChatHistory {
  parent_id?: string;
  chat_room_id?: string;
  chat_content?: string;
  media_data?: string;
}

export interface TypedMediaChat {
  resolution?: string;
  size?: string;
  author?: string;
  date_last_save?: string;
}

export interface TypedCreateMediaChat {
  media_type?: string;
  media_file_name?: string;
  media_meta?: string;
  chat_room_id: string;
  media_mime_type?: string;
  parent_id: string;
  media_path: string;
}

export interface TypedChatMediaLocal {
  media_type?: string;
  media_url?: string;
  media_status?: EnumMessageStatus;
  media_file_name?: string;
  media_path?: string;
  media_mime_type?: string;
  width?: number;
  height?: number;
}

export interface TypedMediaModal {
  url: string;
  height: number;
  width: number;
  type?: string;
}

export interface TypedDataMediaChatHistory {
  _id?: string;
  media_url?: string;
  media_type?: EnumMediaTypeFile | string;
  media_mime_type?: string;
  media_file_name?: string;
  media_status?: number | EnumMessageStatus;
  media_meta?: TypedMetaMedia[];
  media_thumbnail?: string;
  createBy?: string;
}

export interface TypedMetaMedia {
  _id?: string;
  key?: string;
  value?: string;
}

export interface TypedPackageLiveChatPayment {
  minutes: number;
  title: string;
  description: string;
  icon: JSX.Element;
  suggestDescription?: string;
}

export interface TypedPackageLiveChatPaymentOption {
  titleGroup: string;
  packageChats: TypedPackageLiveChatPayment[]
}

export interface TypedMediaResponse {
  src: string
  thumbnail: string
  callback: {
    _id: string
    media_url: string
    media_url_presign: string,
    media_type: string
    media_thumbnail: string
    media_mime_type: string
    media_file_name: string
    chat_history_id: null | string,
    chat_room_id: null | string,
    media_status: number
    media_meta: {
      key: string
      value: number
      _id: string
    }[]
    createBy: string
    createdAt: string
    updatedAt: string
  }
}
