import { User } from '@/types/entity';
import { ApplicationResponse } from '../application-response';

export interface UserFollowerData extends User {
  isFollow: boolean;
}

export type UserFollowersResponse = ApplicationResponse<UserFollowerData[]>;
