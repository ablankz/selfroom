import { ApplicationResponse } from '../application-response';
import { ApplicationPaginateData } from '../application-paginate-data';
import { SimpleUser } from '@/types/entity';

export interface ChatRoomUserData extends SimpleUser {};

export type ChatRoomUsersResponse = ApplicationResponse<
  ApplicationPaginateData<ChatRoomUserData>
>;
