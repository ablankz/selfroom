import { ChatRoom } from '@/types/entity';
import { ApplicationResponse } from '../application-response';
import { ApplicationPaginateData } from '../application-paginate-data';

export interface UserFavoriteData extends ChatRoom {
  isFavorite: boolean;
}

export type UserFolloweesResponse = ApplicationResponse<
  ApplicationPaginateData<UserFavoriteData>
>;
