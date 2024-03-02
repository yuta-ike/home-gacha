import axios from "axios";
import { useState, useCallback } from "react";
import { GachaStartResponse } from "../types/gacha";

export const useGachaStart = (fetchStatus?: () => Promise<void>) => {
  const [result, setResult] = useState<{ data: GachaStartResponse | null, isLoading: boolean, error: string | null }>({ data: null, isLoading: false, error: null });

  const startGacha = useCallback(async () => {
    setResult(prev => ({ ...prev, isLoading: true }));
    try {
      const { data } = await axios.post<GachaStartResponse>(`${import.meta.env.VITE_API_URL}/gacha/start`);
      setResult({ data, isLoading: false, error: null });

      if (fetchStatus) {
        await fetchStatus(); // ガチャ開始後にステータスを更新
      }
    } catch (error: any) {
      setResult({ data: null, isLoading: false, error: error.message || "Unknown error" });
    }
  }, []);

  return { ...result, startGacha };
};
