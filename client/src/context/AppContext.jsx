import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

// Dummy user for demo
const dummyUserData = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://ui-avatars.com/api/?name=John+Doe"
};

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const fetchUser = async () => {
    // Simulate API call
    setUser(dummyUserData);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (user) {
      // Load chats from localStorage when user is ready
      const storedChats = localStorage.getItem("ai_vio_chats");
      if (storedChats) {
        try {
          const parsed = JSON.parse(storedChats);
          setChats(parsed);
          setSelectedChat(parsed[0] || null);
        } catch {
          setChats([]);
          setSelectedChat(null);
        }
      } else {
        setChats([]);
        setSelectedChat(null);
      }
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);

  // Persist chats to localStorage so past chats are restored
  useEffect(() => {
    localStorage.setItem("ai_vio_chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    setUser,
    navigate,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    theme,
    setTheme
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};