"use client";

import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export const GlobalContext = createContext();

export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const {user} = useUser()
    const [selectedTheme, setSelectedTheme] = useState(0);
    const theme = themes[selectedTheme];
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
  
    const [tasks, setTasks] = useState([]);

    const openModal = () => {
      console.log("Modal open")
      setModal(true);
    };
  
    const closeModal = () => {
      setModal(false);
    }; 

    const allTasks = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get("/api/tasks");
    
          const sorted = res.data.sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
          setTasks(res.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      const deleteTask = async (id) => {
        try{
          const res = await axios.delete(`/api/tasks/${id}`);
          toast.success("Task Deleted")
          allTasks();
        }catch (error){
          console.log(error)
        }
      }

      const updateTask = async (task) => {
        try{
          const res = await axios.put(`/api/tasks`, task);
          toast.success("Task Updated")
          allTasks();
        }catch (error){
          console.log(error)
        }
      }

      const completedTasks = tasks.filter((task) => task.isCompleted === true);
      const importantTasks = tasks.filter((task) => task.isImportant === true);
      const inCompletedTasks = tasks.filter((task) => task.isCompleted === false);
      console.log(importantTasks)

      React.useEffect(() => {
        if (user) allTasks();
      }, [user]);
    return (
        <GlobalContext.Provider value={{ theme,tasks,deleteTask,isLoading,completedTasks,importantTasks,inCompletedTasks,updateTask,modal,openModal,closeModal }}>
            <GlobalUpdateContext.Provider value={{ setSelectedTheme }}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalUpdateContext = () => useContext(GlobalUpdateContext);
