"use client";
import React from "react";
import { useRouter } from "next/router";
function index({}) {
  const router = useRouter();
  const data = router.query;
  console.log(data.data);
  return <div></div>;
}

export default index;
