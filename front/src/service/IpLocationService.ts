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
    const { data } = await this.httpService.get<{
      returnvalue: {
        ip: string;
        latitude: number;
        longitude: number;
      };
    }>(`/ip-lookup/${jobId}`);

    return data.returnvalue;
  };
}
