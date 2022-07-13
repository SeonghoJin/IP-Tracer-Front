import {HttpResponse} from "./HttpResponse";
import {ApiHealth} from "./ApiHealth";

export type GetApiHeathResponseDto = HttpResponse<ApiHealth[]>;
