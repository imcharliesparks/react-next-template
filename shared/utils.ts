import { CredentialedSignUp } from './types'
import bcrypt from 'bcrypt'

/* eslint-disable no-useless-escape */
export const validateEmail = (email?: string) => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return !email ? false : re.test(String(email).toLowerCase())
}

export const validatePassword = (password?: string) => {
	const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
	return !password ? false : re.test(String(password))
}

export const validateCredentials = ({ firstName, lastName, email, password }: CredentialedSignUp) => {
	if (!firstName || !lastName || !validateEmail(email) || !validatePassword(password)) {
		return false
	}

	return true
}

export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}

export const comparePasswords = async (password: string, hash: string) => {
	return await bcrypt.compare(password, hash)
}
