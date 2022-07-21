import { poolingWhileFulfilled } from "../util/poolingWhileFulfilled";
import { HttpStatus } from "../constants/HttpStatus";
import { Location } from "../types/Location";
import { ApiHealth } from "../types/ApiHealth";
import { HttpService } from "./HttpService";

export interface IIpLocationService {
  findLocation: (ip: string) => Promise<null | Location>;
  getApiHealths: () => Promise<null | ApiHealth[]>;
}

export class IpLocationService implements IIpLocationService {
  constructor(private httpService: HttpService) {}

  findLocation = async (ip: string) => {
    const response = await poolingWhileFulfilled(
      async () => {
        const response = await this.httpService.get<Location>(
          `/ip-lookup/location/${ip}`
        );
        return response;
      },
      {
        isFulfilled: (response) => {
          return response.status === HttpStatus.OK;
        },
      }
    );

    if (response === null) {
      console.warn("not found location");
      return null;
    }

    return response.data;
  };

  getApiHealths = async () => {
    const response = await poolingWhileFulfilled(
      async () => {
        const response = await this.httpService.get<ApiHealth[]>(
          "/ip-lookup/api/health"
        );
        return response;
      },
      {
        isFulfilled: (response) => {
          return response.status === HttpStatus.OK;
        },
      }
    );

    if (response === null) {
      console.warn("not found apiHealths");
      return null;
    }

    return response.data;
  };
}
