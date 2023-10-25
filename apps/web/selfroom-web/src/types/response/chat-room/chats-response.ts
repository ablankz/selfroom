import { ApplicationCursorPaginateData } from '../application-cursor-paginate-data';
import { ApplicationResponse } from '../application-response';
import { Chat } from '@/types/entity';

export interface ChatData extends Chat {}

export type ChatsResponse = ApplicationResponse<ApplicationCursorPaginateData<ChatData>>;
