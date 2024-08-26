import {useEffect, useState} from "react";
import {AxiosRequestConfig, CanceledError} from "axios";
import APIClient from "../services/apiClient";

// not used anymore- using react query instead
const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        new APIClient<T>(endpoint).getAll({ signal: controller.signal, ...requestConfig })
            .then(data => {
                setData(data.results);
                setLoading(false);
            })
            .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            });

        return () => controller.abort();
    }, deps ? [...deps] : []);

    return {data, error, isLoading};
}

export default useData;