import React from "react";
import { useCurrentQuery } from "../../app/services/userApi"
import {Spinner} from "@heroui/spinner";

export const AuthGuard = ({ children }: { children: React.JSX.Element }) => {
	const { isLoading } = useCurrentQuery()
	
	if (isLoading) {
		return <Spinner />
	}
	
	return children
}