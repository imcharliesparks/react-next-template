// TODO: Add linting to organize by type of export
// API Types
export enum APIMethods {
	POST = 'POST',
	GET = 'GET',
	PUT = 'PUT',
	DELETE = 'DELETE'
}

export enum AuthResponses {
	USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
	UNABLE_TO_SAVE_USER = 'UNABLE_TO_SAVE_USER',
	INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
	INVALID_REQUEST_TYPE = 'INVALID_REQUEST_TYPE',
	USER_CREATED = 'USER_CREATED',
	USER_NOT_FOUND = 'USER_NOT_FOUND'
}

export enum NextAuthStatues {
	AUTHENTICATED = 'authenticated',
	UNAUTHENTICATED = 'unauthenticated',
	LOADING = 'loading'
}

export enum APIStatuses {
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR'
}

export enum UserPermissions {
	DEVELOPER = 'DEVELOPER',
	ADMIN = 'ADMIN',
	USER = 'USER'
}

export enum FormErrors {
	INVALID_EMAIL = 'INVALID_EMAIL'
}

export type CredentialSignin = {
	username: string
	password: string
}

export type CredentialedSignUp = {
	email: string
	password: string
	firstName: string
	lastName: string
}

export type CredentialedSignIn = {
	email: string
	password: string
}
