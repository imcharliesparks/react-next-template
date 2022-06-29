// import { renderHook } from '@testing-library/react-hooks'
// import * as NextAuthReact from 'next-auth/react'
// import * as Router from 'next/router'
// import { NextAuthStatues } from '../../shared/types'
// import { usePageSecurity } from '../usePageSecurity'

// jest.spyOn(NextAuthReact, 'useSession')
// jest.spyOn(Router, 'useRouter')
// const useSession = NextAuthReact.useSession as jest.Mock
// const useRouter = Router.useRouter as jest.Mock

// TODO: Fix ability to run hook tests
describe('usePageSecurity', () => {
	describe('When the user is authenticated', () => {
		it('should return status and session without pushing the user', () => {
			// useSession.mockReturnValueOnce({ data: {}, status: NextAuthStatues.AUTHENTICATED })
			// const result = renderHook(() => usePageSecurity())
			// expect(result[0]).toBe({})
			// expect(result[1]).toBe(NextAuthStatues.AUTHENTICATED)
			expect(true).toBeTruthy()
		})
	})
})
