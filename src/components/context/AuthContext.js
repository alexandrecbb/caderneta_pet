import { createContext, useCallback, useMemo, useState, useEffect } from 'react';

export const AuthContext = createContext();

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';


export const AuthProvider = ({ children }) => {

  const [accessToken, setAccessToken] = useState()


  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if (accessToken) {
      console.log(accessToken)
      setAccessToken(JSON.parse(accessToken));
    } else {
      setAccessToken(undefined);
    }
  }, []);



  const login = useCallback(() => {

    fetch('http://localhost:5000/auth/accessToken', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      //body: JSON.stringify({email, password}),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        setAccessToken(data)
        localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(data));
      })
      .catch((err) => {

        console.error(err)
        return new Error(err.message || 'Erro no login.')
      })

  }, []);

  const logout = useCallback(() => {

    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(undefined);

  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    console.log("accessToken:", accessToken);
  }, [isAuthenticated, accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

