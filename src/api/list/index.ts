import { useCallback, useEffect, useState } from "react";
import { CarDetailItf, CarListItf } from "./interface";
import { useListStore } from "src/store/list/useListStore";
import { shallow } from "zustand/shallow";
import fetcher from "../fetcher";

export const useCarListData = () => {
  const [data, setData] = useState<CarListItf[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetcher<CarListItf[]>("/carClasses");
      setData(data || []);
    } catch (err: any) {
      setError(err.message);
      window.alert("에러 발생\n리스트를 불러올 수 없습니다\n");
      throw Error(err);
    } finally {
      // 로딩 테스트를 위해 임의로 1초 로딩
      setTimeout(() => setIsLoading(false), 1000);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { data, isLoading, error };
};

export const useCarDetailData = () => {
  const [detailCarClassId, setDetailCarClassId] = useListStore(
    (state) => [state.detailCarClassId, state.setDetailCarClassId],
    shallow
  );
  const [data, setData] = useState<CarDetailItf | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetcher<CarDetailItf[]>(
        `/carClasses/${detailCarClassId}`
      );
      setData(data?.[0]);
    } catch (err: any) {
      setError(err.message);
      window.alert("에러 발생\n차량정보를 불러올 수 없습니다\n");
      throw Error(err);
    } finally {
      // 로딩 테스트를 위해 임의로 1초 로딩
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [detailCarClassId]);

  useEffect(() => {
    if (detailCarClassId) {
      fetchData();
    }
    return () => setDetailCarClassId(null as any);
  }, [detailCarClassId, setDetailCarClassId, fetchData]);
  return { data, isLoading, error };
};