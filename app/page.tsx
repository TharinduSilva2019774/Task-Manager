"use client"
import Tasks from "./Components/Tasks/Tasks";
import { useGlobalContext } from "./context/globalProvider";

export default function Home() {

  const {tasks} = useGlobalContext();

  return (
        <Tasks tasks={tasks} title={"All Tasks"}/>
  );
}
