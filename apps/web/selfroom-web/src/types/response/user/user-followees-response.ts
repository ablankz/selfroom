import { User } from '@/types/entity';
import { ApplicationResponse } from '../application-response';
import { ApplicationPaginateData } from '../application-paginate-data';

export interface UserFolloweeData extends User {
  isFollow: boolean;
}

export type UserFolloweesResponse = ApplicationResponse<
  ApplicationPaginateData<UserFolloweeData>
>;
