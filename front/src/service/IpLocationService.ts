import { requestWhileFulfilled } from "../util/requestWhileFulfilled";
import {FindLocationResponse} from "../types/FindLocationResponse";
import {HttpStatus} from "../constants/HttpStatus";
import {GetApiHeathResponseDto} from "../types/GetApiHealthResponse";
import { HttpService } from "./HttpService";

export class IpLocationService {
  constructor(private httpService: HttpService) {}

  findLocation = async (ip: string) => {
    const response = await requestWhileFulfilled(async () => {
      const response = await this.httpService.post<{ip: string}, FindLocationResponse>(
          "/ip-lookup/location",
          { ip }
      );
      return response;
    }, {
      isFulfilled:(response) => {
        return response.status === HttpStatus.CREATED;
      },
    });

    if(response === null) {
      console.warn('not found location');
      return null;
    }

    return response.data;
  };

  getApiHealths = async () => {
    const response = await requestWhileFulfilled(async () => {
      const response = await this.httpService.get<GetApiHeathResponseDto>("/api/health");
      return response;
    }, {
      isFulfilled: (response) => {
        return response.status === HttpStatus.OK
      },
    });

    if(response === null){
      console.warn('not found apiHealths');
      return null;
    }

    return response.data;
  }
}
