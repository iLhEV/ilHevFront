import Vue from "vue";

export const toastSuccess = (errMsg) => {
  return Vue.$toast.success(errMsg);
};

export const toastError = (errMsg) => {
  return Vue.$toast.error(errMsg);
};

export const toastWarning = (errMsg) => {
  return Vue.$toast.warning(errMsg);
};

export const toastInfo = (errMsg) => {
  return Vue.$toast.info(errMsg);
};
