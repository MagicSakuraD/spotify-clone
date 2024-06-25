"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import Avatar from "boring-avatars";
import React from "react";

const AccountContent = () => {
  const user = useUser();

  return (
    <Card className="mx-auto mt-6">
      <CardHeader>
        <CardTitle className="">Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-x-5 items-center">
        <Avatar
          size={40}
          name={user.user?.email}
          variant="beam"
          colors={["#92A1C6", "#146A7C", "#6366f1", "#C271B4", "#f43f5e"]}
        />
        <p>{user.user?.email}</p>
      </CardContent>
    </Card>
  );
};

export default AccountContent;
