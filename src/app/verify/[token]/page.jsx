import { Suspense } from "react";
import VerifyClient from "./VerifyClient";

export const metadata = {
  title: "Identity verification",
  robots: { index: false, follow: false },
};

async function VerifyWithToken({ params }) {
  const { token } = await params;
  return <VerifyClient token={token} />;
}

export default function VerifyClientPage({ params }) {
  return (
    <Suspense fallback={<div className="min-h-[100svh] bg-[#F9FAFB]" />}>
      <VerifyWithToken params={params} />
    </Suspense>
  );
}
