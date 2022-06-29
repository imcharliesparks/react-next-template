import { CredentialedSignUp } from '../types'
import { validateSignupCredentials, validateEmail, validatePassword } from '../utils'

describe('CredentialValidation', () => {
	describe('validateEmail', () => {
		it('should return true for valid email', () => {
			expect(validateEmail('charlie@gmail.com')).toBe(true)
		})

		it('should return false for an invalid email', () => {
			expect(validateEmail('charlie@gmail')).toBe(false)
		})

		it('should return false if the value is undefined', () => {
			expect(validateEmail('')).toBe(false)
		})
	})

	describe('validatePassword', () => {
		it('should return true for valid password (8 chars, lower and upper case, one number, one special char)', () => {
			expect(validatePassword('Password123!')).toBe(true)
		})
		it('should return false for an invalid password', () => {
			expect(validatePassword('password123')).toBe(false)
		})
		it('should return false if the value is undefined', () => {
			expect(validateEmail('')).toBe(false)
		})
	})

	describe('validateCredentials', () => {
		const validCredentials: CredentialedSignUp = {
			firstName: 'Charlie',
			lastName: 'Brown',
			email: 'charlie@gmail.com',
			password: 'Password123!'
		}
		it('should return true for valid credentials', () => {
			expect(validateSignupCredentials(validCredentials)).toBe(true)
		})

		it('should return false if either `firstName` or `lastName` are undefined', () => {
			const invalidCredentials: CredentialedSignUp = { ...validCredentials, firstName: '' }
			expect(validateSignupCredentials(invalidCredentials)).toBe(false)
		})
	})
})
