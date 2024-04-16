"use client";
import { Modal } from "@/components/ui/modal";
import { UseStoreModel } from "@/hooks/use-store-model";
import { useEffect } from "react";

export default function Home() {
  const onOpen = UseStoreModel((state) => state.onOpen);
  const isOpen = UseStoreModel((state) => state.isOpen);
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return <p>test</p>;
}
