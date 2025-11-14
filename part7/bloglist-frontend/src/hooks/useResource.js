/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNotify } from "./useNotify";

export const useResource = (baseUrl, defVal) => {
  const [value, setValue] = useState(defVal);
  const notify = useNotify();
  useEffect(() => {
    axios
      .get(baseUrl)
      .then((res) => setValue(res.data))
      .catch((err) => {
        notify({ type: "error", msg: "Error downloading data" });
        setValue(null);
        console.log(err);
      });
  }, []);
  return value;
};
