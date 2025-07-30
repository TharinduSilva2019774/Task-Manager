"use client"
import React from "react";
import { useGlobalContext } from "../context/globalProvider";
import Tasks from "../Components/Tasks/Tasks";


function page() {
  
  const {completedTasks} = useGlobalContext();

  return (
        <Tasks tasks={completedTasks} title={"Completed Tasks"}/>
  );
}

export default page;
