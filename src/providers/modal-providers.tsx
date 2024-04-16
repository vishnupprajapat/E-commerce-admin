"use client";
import { StoreModel } from "@/components/modals/store-modal";
import { useEffect, useState } from "react";
export const ModalProviders = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <StoreModel />;
    </>
  );
};
