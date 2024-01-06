import { createContext, useCallback, useMemo, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [accessToken, setAccessToken] = useState()

  const login = useCallback((email, password) => {

    fetch(`${process.env.REACT_APP_API_URL}/enter`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN')}`
      },
      body: JSON.stringify({email, password}),
    })
      .then((resp) => resp.json())
      .then((data) => {

        const [key, value] = Object.entries(data)[0]

        if(key === 'accessToken'){
          localStorage.setItem('APP_ACCESS_TOKEN', value)
          setAccessToken(value)
        }
    
      })
      .catch((err) => {
        console.error(err)
        console.log('erro ao aconectar ao servidor')
      })

  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('APP_ACCESS_TOKEN')

    if (accessToken) {
      setAccessToken(accessToken)
    } else {
      setAccessToken(undefined)
    }
  }, []);

  const logout = useCallback(() => {

    localStorage.removeItem('APP_ACCESS_TOKEN');
    setAccessToken(undefined);

  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

