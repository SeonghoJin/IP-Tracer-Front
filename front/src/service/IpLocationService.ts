import {requestWhileFulfilled} from "../util/requestWhileFulfilled";
import { HttpService } from "./HttpService";

export class IpLocationService {
  constructor(private httpService: HttpService) {}

  findLocation = async (ip: string) => {
    const { data: jobId } = await this.httpService.post<{ip: string}, {data: number}>(
        "/ip-lookup/location",
        { ip }
    );
    return jobId;
  };

  getLocationResource = async (jobId: number) => {
    const response = await requestWhileFulfilled(async () => {
      return await this.httpService.get<{
        returnvalue: {
          ip: string;
          latitude: number;
          longitude: number;
        };
      }>(`/ip-lookup/location/${jobId}`);
    }, {
      isFulfilled: (response) => {
        console.log('is inner', response);
        return response.status === 200;
      }});

    return response;
  };
}
