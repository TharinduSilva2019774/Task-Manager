"use client"
import React from "react";
import { useGlobalContext } from "../context/globalProvider";
import Tasks from "../Components/Tasks/Tasks";


function page() {
  
  const {importantTasks} = useGlobalContext();

  return (
        <Tasks tasks={importantTasks} title={"Important Tasks"}/>
  );
}

export default page;
