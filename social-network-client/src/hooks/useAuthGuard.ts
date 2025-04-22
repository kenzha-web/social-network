import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import {selectIsAuthenticated} from "../features/user/userSlice.tsx";

export const useAuthGuard = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated)
	const navigate = useNavigate()
	
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/")
		}
	}, [])
}