import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiMethods from '../../helpers/ApiManager/ApiMethods';

const Authorization = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authorize = async () => {
      try {
        await ApiMethods.getAccessToken()
        navigate("/start")
      } catch {
        navigate("/error")
      }
    }

    authorize()
  }, [navigate])

  return (
    <div>Authorizing...</div>
  )
}

export default Authorization