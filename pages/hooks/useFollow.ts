import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);

    const loginModal = useLoginModal();

    // 从我关注的列表中查找是否有该用户的关注
    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];
        return list.includes(userId);
    }, [userId, currentUser?.followingIds]);

    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (isFollowing) {
                // 这里需要把当前用户传递
                request = () =>
                    axios.delete("/api/follow", {
                        data: { userId, currentUser },
                    });
            } else {
                request = () =>
                    axios.post("/api/follow", { userId, currentUser });
            }

            await request();

            mutateCurrentUser();
            mutateFetchedUser();

            toast.success("Success");
        } catch (error) {
            toast.error("Something went wrong");
        }
    }, [
        currentUser,
        userId,
        mutateCurrentUser,
        mutateFetchedUser,
        loginModal,
        isFollowing,
    ]);

    return {
        isFollowing,
        toggleFollow,
    };
};

export default useFollow;
