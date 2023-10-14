import { User } from '@/types/entity';
import { ApplicationResponse } from '../application-response';

export type UserData = User;

export type UserResponse = ApplicationResponse<UserData>;
