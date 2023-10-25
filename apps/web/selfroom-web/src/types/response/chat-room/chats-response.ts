import { ApplicationResponse } from '../application-response';
import { Chat } from '@/types/entity';

export interface ChatData extends Chat {}

export type ChatsResponse = ApplicationResponse<ChatData[]>;
