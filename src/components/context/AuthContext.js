import { createContext, useCallback, useMemo, useState, useEffect } from 'react';

export const AuthContext = createContext();

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';


export const AuthProvider = ({ children }) => {

  const [accessToken, setAccessToken] = useState()

  const login = useCallback((email, password) => {

    fetch(`${process.env.REACT_APP_API_URL}/enter`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN)}`
      },
      body: JSON.stringify({email, password}),
    })
      .then((resp) => resp.json())
      .then((data) => {

        const [key, value] = Object.entries(data)[0]

        if(key === 'accessToken'){
          localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(value))
          setAccessToken(value)
        }
    
      })
      .catch((err) => {
        console.error(err)
        console.log('erro catch')
      })

  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN)

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken))
    } else {
      setAccessToken(undefined)
    }
  }, [setAccessToken]);

  const logout = useCallback(() => {

    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(undefined);

  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken])

  // useEffect(() => {
  //   console.log(isAuthenticated);
  //   console.log(accessToken);
  // }, [isAuthenticated, accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

