import { Axios } from "axios";
import { UseMutationOptions, useMutation } from "react-query";

export function useRegisterEmail(options: UseMutationOptions = {}) {
  const api: Axios = (window as any).api;
  return useMutation(
    (params: { alias: string; email: string }) =>
      api.post("/api/v1/emails/lookup", params).then(({ data }) =>  data),
    options as any
  );
}
