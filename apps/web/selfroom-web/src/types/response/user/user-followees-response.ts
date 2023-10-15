import { User } from '@/types/entity';
import { ApplicationResponse } from '../application-response';

export interface UserFolloweeData extends User {
  isFollow: boolean;
}

export type UserFolloweesResponse = ApplicationResponse<UserFolloweeData[]>;
