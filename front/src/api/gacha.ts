import axios from "axios";
import { useEffect, useState } from "react";
import { GachaStatus } from "../types/gacha";



const getGachaStatus = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/gacha/status`);
    return res.data;
  } catch {
    return null;
  }
};

export const useGachaStatus = () => {
  const [gachaStatus, setGachaStatus] = useState<GachaStatus>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getGachaStatus();
        setGachaStatus(result.data ? "available" : "unavailable");
      } catch (error) {
        console.error("Failed to fetch data");
        setGachaStatus("unavailable")
      }
    };

    fetchData();

    // 10秒ごとにデータフェッチを繰り返す
    const intervalId = setInterval(fetchData, 10000);

    // コンポーネントのクリーンアップ時にインターバルをクリア
    return () => clearInterval(intervalId);
  }, []);

  return { gachaStatus };
};

const postGachaStart = async () => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/gacha/start`);
    return res.data;
  } catch {
    return null;
  }
}

export const useGachaStart = () => {
  const [result, setResult] = useState<string>();

  const fetchData = async () => {
    try {
      const result = await postGachaStart();
      setResult(result.data ? "waiting" : "error");
    } catch (error) {
      console.error("Failed to fetch data");
      setResult("error")
    }
  };

  return { fetchData, result };
};
