import { NextApiRequest, NextApiResponse } from 'next'
import { CredentialedUser, UserModel } from '../../../models/CredentialedUser'
import { APIMethods } from '../../../shared/types'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { MONGODB_URI } from '../../../shared/constants'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body } = req

	await mongoose.connect(MONGODB_URI)

	if (method !== APIMethods.POST) {
		return res.status(400).send('Wrong request type for singup endpoint')
	}

	try {
		const { firstName, lastName, email, password } = body
		const foundUser = await UserModel.findOne({ email })

		if (foundUser) {
			return res.status(400).send('User is already signed up')
		}

		// TODO: Add validation
		const newUser: CredentialedUser = {
			firstName,
			lastName,
			email,
			password
		}

		const user = new UserModel(newUser)
		const salt = await bcrypt.genSalt(10)
		user.password = await bcrypt.hash(user.password, salt)
		const savedUser = await user.save()

		if (!savedUser) {
			throw new Error('Unable to save user')
		} else {
			return res.status(201).json({ status: 'user created', user: savedUser._id.toString() })
		}
	} catch (e) {
		console.log('e', e)
	}
}

export default handler
