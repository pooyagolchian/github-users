import http from "../helper/Http";
import { User } from "../interfaces/IUser";
import { AxiosResponse } from "axios";

const FetchGithubUsers = async (): Promise<AxiosResponse> => {
  return await http.get<User[]>("/users?q=addClass+user:mozilla&per_page=10");
};

const UsersService = {
  FetchGithubUsers,
};

export default UsersService;
