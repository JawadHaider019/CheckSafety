import { Suspense } from "react";
import { connection } from "next/server";
import SosClient from "./SosClient";

export const metadata = {
  title: "SOS — CheckSafe",
  robots: { index: false, follow: false },
};

async function DynamicMarker() {
  await connection();
  return null;
}

export default function SosPanicPage() {
  return (
    <>
      <Suspense fallback={null}>
        <DynamicMarker />
      </Suspense>
      <SosClient />
    </>
  );
}
