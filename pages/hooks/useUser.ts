import useSWR from "swr";

import fetcher from "@/libs/fetcher";

// 通过这个接口的数据，如果已经存在了，就不需要再获取了，相当于持久化的作用
const useUser = (userId: string) => {
    const { data, error, isLoading, mutate } = useSWR(
        userId ? `/api/users/${userId}` : null,
        fetcher
    );

    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default useUser;
