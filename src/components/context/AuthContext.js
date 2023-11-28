import { createContext, useCallback, useMemo, useState, useEffect } from 'react';

export const AuthContext = createContext();

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';


export const AuthProvider = ({ children }) => {
  //const [isAuthenticated, setAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState()
  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);


  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken));
    } else {
      setAccessToken(undefined);
    }
  }, []);

  const login = useCallback ((email, password) => {
    
    fetch('http://localhost:5000/auth', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email, password)
    })
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(data.accessToken));
        setAccessToken(data.accessToken)
        console.log(data.accessToken)
      })
      .catch((err) => {
        console.error(err)
        return new Error(err.message || 'Erro no login.')
      })

  },[]);

  const logout = useCallback ( () => {

    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(undefined);

  },[]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

