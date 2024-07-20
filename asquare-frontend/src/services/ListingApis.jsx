import axios from "axios";
import { apiInstance } from "./apiInstance";

export const BuyListingApi = async (page = 1) => {
  const response = await apiInstance.get(`/buylistings/?page=${page}`);
  return response.data;
};

export const RentListingApi = async (page = 1) => {
  const response = await apiInstance.get(`/rentallistings/?page=${page}`);
  return response.data;
};

export const OffPlanListingApi = async (page = 1) => {
  const response = await apiInstance.get(`/offplanlistings/?page=${page}`);
  return response.data;
};

export const CommercialListingApi = async (page = 1) => {
  const response = await apiInstance.get(`/commerciallistings/?page=${page}`);
  return response.data;
};
