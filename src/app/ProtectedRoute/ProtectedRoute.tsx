"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/Components/loading/Loading";
import { useAppSelector } from "@/hooks/store.hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
     const token = useAppSelector((store)=>store.userReducer.token)

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token) {
    return <Loading/>;
  }

  return <>{children}</>;
}