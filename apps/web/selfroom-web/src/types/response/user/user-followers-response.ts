import { User } from '@/types/entity';
import { ApplicationResponse } from '../application-response';
import { ApplicationPaginateData } from '../application-paginate-data';

export interface UserFollowerData extends User {
  isFollow: boolean;
}

export type UserFollowersResponse = ApplicationResponse<
  ApplicationPaginateData<UserFollowerData>
>;
