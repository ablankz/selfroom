import { API_RESPONSE_TYPES } from "@/constants/backend-response";

export type ApplicationResponse<T> = {
  success: boolean; // 成功(2xx)ならtrue, 失敗(4xx, 5xx)ならfalse
  data: T; // 成功ならnull以外、からのデータでも空配列で返却される
  code: ApiResponseType;
  message: string; // エラーコードごとのメッセージ
  validation_messages: ApplicationValidationMessages; // バリデーションでエラーがあったときのみ
};

​
type ApiResponseType =
  (typeof API_RESPONSE_TYPES)[keyof typeof API_RESPONSE_TYPES];

type ApplicationValidationMessages = {
  [key: string]: string[];
}[];
