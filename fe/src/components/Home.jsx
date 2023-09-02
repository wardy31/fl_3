import React from "react";
import { useParams, Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
export default function Home() {
  const { id } = useParams();
  return (
    <>
      <Outlet/>
    </>
  );
}
