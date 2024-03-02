import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { GachaStatusResponse } from "../types/gacha";

export const useGachaStatus = () => {
  const [status, setStatus] = useState<{ data: GachaStatusResponse | null, isLoading: boolean, error: string | null }>({ data: null, isLoading: false, error: null });

  const fetchStatus = useCallback(async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    try {
      const { data } = await axios.get<GachaStatusResponse>(`${import.meta.env.VITE_API_URL}/gacha/status`);
      setStatus({ data:  { status:data.status ?  "waiting": "error" }, isLoading: false, error: null });
    } catch (error: any) {
      setStatus({ data: null, isLoading: false, error: error.message || "Unknown error" });
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // 10秒ごとにガチャのステータスを取得
    return () => clearInterval(interval);
  }, [fetchStatus]);

  return{ status, fetchStatus };
};
