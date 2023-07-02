import { SuccessResponse } from "../Notes/dto/SuccessResponse.dto";

export class HttpGateway {
  get = async (path: string) => {
    const response = await fetch(path);
    const dto = response.json();
    return dto;
  };

  post = async (path: string, requestDto: any) => {
    const response = await fetch(path, {
      method: "POST",
      body: JSON.stringify(requestDto),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseDto = response.json();
    return responseDto;
  };

  patch = async (path: string, requestDto: any): Promise<SuccessResponse> => {
    const response = await fetch(path, {
      method: "PATCH",
      body: JSON.stringify(requestDto),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseDto = response.json();
    return responseDto;
  };

  delete = async (path: string): Promise<SuccessResponse> => {
    const response = await fetch(path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseDto = response.json();
    return responseDto;
  };
}
