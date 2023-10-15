import { User } from '@/types/entity';
import { ApplicationResponse } from '../application-response';

export interface UserData extends User{};

export type UserResponse = ApplicationResponse<UserData>;
