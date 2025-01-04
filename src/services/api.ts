import { isAxiosError } from "axios";
import { api } from "../config/axios";
import type { User, UserNickname } from "../types";

export const getUser = async () => {
  try {
    const { data } = await api<User>("/user");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const updateUserProfile = async (dataForm: User) => {
  try {
    const { data } = await api.patch("/user", dataForm);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const uploadImage = async (file: File)=>{
  const formData = new FormData();
  formData.append("avatar", file);
  try {
    const {data} = await api.post("/user/upload", formData);
    return  data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.message)
    }
  }
}

export const getUserProfile = async (nickname: User["nickname"]) => {
  try {
    const { data } = await api.get<UserNickname>(`/${nickname}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export const searchByNickname = async (nickname: User["nickname"]) => {
  try {
    const { data } = await api.post(`/search`,{nickname});
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}