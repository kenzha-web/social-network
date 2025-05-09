import { Button as NextButton } from "@heroui/button"
import React from "react"

type Props = {
	children: React.ReactNode
	icon?: React.JSX.Element
	className?: string
	type?: "button" | "submit" | "reset"
	fullWidth?: boolean
	color?:
		| "default"
		| "primary"
		| "secondary"
		| "success"
		| "warning"
		| "danger"
		| undefined
}

export const Button: React.FC<Props> = ({ children, icon, className, type, fullWidth, color}) => {
	return (
		<NextButton
			startContent={icon}
			size="lg"
			color={color}
			variant="light"
			className={className}
			type={type}
			fullWidth={fullWidth}
		>
			{children}
		</NextButton>
	)
}