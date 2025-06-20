// import { useContext } from "react";
// import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// import {useNavigate} from 'react-router-dom'
// import {useUser, useAuth} from '@clerk/clerk-react'
// import { toast } from "react-hot-toast";
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// const AppContext = createContext();
// export const AppProvider = ({ children }) => {
//     const currency = import.meta.env.VITE_CURRENCY || '$';
//     const navigate = useNavigate();
//     const {user} = useUser(); 
//     const {getToken} = useAuth();
//     const [isOwner, setIsOwner] = useState(false)
//     const [showHotelReg, setShowHotelReg] = useState(false)
//     const [searchedCities, setSearchedCities] = useState([]);
//     const fetchUser = async () => {
//         try{
//             const {data} = await axios.get('/api/user', {headers: {Authorization: `Bearer ${await getToken()}`}});
//            if(data.success){
//             setIsOwner(data.role === "hotelOwner");
//             setSearchedCities(data.recentSearchedCities);
//            }else{
//             setTimeout(() => {
//                 fetchUser();
//             }, 5000)
//            }
//         }catch(error){
//            toast.error(error.message);
//         }
//     }
//     useEffect(() => {
//         if(user){
//             fetchUser();
//         }
       
//     }, [user])
//     const value ={
//   currency, navigate, user, getToken, isOwner, setIsOwner, axios,  showHotelReg, setShowHotelReg, searchedCities, setSearchedCities
//     }
//     return (
//         <AppContext.Provider value={{ value }}>{children}</AppContext.Provider>
//     )
// }
// export const useAppContext = () => useContext(AppContext);
import { useContext, createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isOwner, setIsOwner] = useState(null); // null indicates loading
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const fetchUser = async () => {
    if (!user || retryCount >= MAX_RETRIES) return;
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setIsOwner(data.role === "hotelOwner" ? true : false);
        setSearchedCities(data.recentSearchedCities || []);
        setRetryCount(0); // Reset retries on success
      } else {
        setRetryCount((prev) => prev + 1);
        setTimeout(fetchUser, 5000); // Retry after 5 seconds
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Error fetching user data. Please try again later.");
      setIsOwner(false); // Fallback to non-owner
      setRetryCount((prev) => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    } else {
      setIsOwner(false); // Reset when user logs out
      setShowHotelReg(false); // Close modal on logout
    }
  }, [user]);

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    axios,
    showHotelReg,
    setShowHotelReg,
    searchedCities,
    setSearchedCities,
    isLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
