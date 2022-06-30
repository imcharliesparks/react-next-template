// TODO: Add linting to organize by type of export
// API Types
export enum APIMethods {
	POST = 'POST',
	GET = 'GET',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH'
}

export enum GeneralAPIResponses {
	FAILURE = 'FAILURE',
	INVALID_REQUEST_TYPE = 'INVALID_REQUEST_TYPE'
}

export enum AuthResponses {
	USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
	UNABLE_TO_SAVE_USER = 'UNABLE_TO_SAVE_USER',
	INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
	USER_CREATED = 'USER_CREATED',
	USER_NOT_FOUND = 'USER_NOT_FOUND',
	USER_DELETED = 'USER_DELETED',
	WRONG_PASSWORD = 'WRONG_PASSWORD',
	UNABLE_TO_DELETE_USER = 'UNABLE_TO_DELETE_USER',
	UNABLE_TO_FIND_USER = 'UNABLE_TO_FIND_USER',
	UNAUTHORIZED = 'UNAUTHORIZED'
}

export enum EntityReponses {
	ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
	UNABLE_TO_SAVE_ENTITY = 'UNABLE_TO_SAVE_ENTITY',
	ENTITY_CREATED = 'ENTITY_CREATED',
	ENTITY_UPDATED = 'ENTITY_UPDATED',
	ENTITY_DELETED = 'ENTITY_DELETED',
	ENTITY_FOUND = 'ENTITY_FOUND',
	UNABLE_TO_UPDATE_ENTITY = 'UNABLE_TO_UPDATE_ENTITY',
	UNABLE_TO_DELETE_ENTITY = 'UNABLE_TO_DELETE_ENTITY'
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
