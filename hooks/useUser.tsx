import { User } from "@supabase/auth-helpers-nextjs";
import { Subscription, UserDetails } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetail: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () => supabase.from("users").select("*").single();
  const getSubscription = () =>
    supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  // useEffect(() => {
  //   if (user && !isLoadingData && !userDetails && !subscription) {
  //
  //     setIsLoadingData(true);
  //     Promise.allSettled([getUserDetails(), getSubscription()]).then(
  //       (results) => {
  //         const userDetailsPromise = results[0];
  //         const subscriptionPromise = results[1];

  //         if (userDetailsPromise.status === "fulfilled") {
  //           setUserDetails(userDetailsPromise.value.data as UserDetails);
  //         }

  //         if (subscriptionPromise.status === "fulfilled") {
  //           setSubscription(subscriptionPromise.value.data as Subscription);
  //         }

  //         setIsLoadingData(false);
  //       }
  //     );
  //   } else if (!user && !isLoadingUser && !isLoadingData) {
  //     setUserDetails(null);
  //     setSubscription(null);
  //   }
  // }, [user, isLoadingUser]);

  //暂时弃用subscription版本
  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setIsLoadingData(true);
      getUserDetails().then((res) => {
        if (res.data) {
          setUserDetails(res.data as UserDetails);
        }
        setIsLoadingData(false);
      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetail: userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
