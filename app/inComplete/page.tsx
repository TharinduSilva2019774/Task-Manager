"use client"
import React from "react";
import { useGlobalContext } from "../context/globalProvider";
import Tasks from "../Components/Tasks/Tasks";


function page() {
  
  const {inCompletedTasks} = useGlobalContext();

  return (
        <Tasks tasks={inCompletedTasks} title={"InCompleted Tasks"}/>
  );
}

export default page;
