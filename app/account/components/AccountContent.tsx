import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { supabase } from "@/utils/supabase/client";

// import { createClient } from "@/utils/supabase/server";
import { createClient } from "@supabase/supabase-js";

import React from "react";

// async function getData() {
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   );

//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.getUser();

//   console.log(user);

//   if (error) {
//     // This will activate the closest `error.js` Error Boundary
//     console.log(error);
//     throw new Error("Failed to fetch data");
//   }

//   return user;
// }

const AccountContent = async () => {
  // const user = await getData();
  return (
    <Card className="container mx-auto mt-6">
      <CardHeader>
        <CardTitle className="">Account Information</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Comming soon!</p>
      </CardContent>
    </Card>
  );
};

export default AccountContent;
