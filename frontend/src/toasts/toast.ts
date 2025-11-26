import toast from "react-hot-toast";

export const customToast = (type: "suc" | "err", message: string) => {
  if (type == "suc") {
    toast.success(message, {
      style: { background: "#008011", color: "#ffffff" },
    });
  } else {
    toast.error(message, {
      style: { background: "#cc0000", color: "#ffffff" },
    });
  }
};
