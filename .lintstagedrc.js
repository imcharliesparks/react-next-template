module.exports = {
	'**/*.(ts|tsx)': () => ['yarn tsc --noEmit', 'yarn eslint'],
	'**/*.(ts|tsx)': 'yarn prettier --write',
	'**/*.(md|json)': 'yarn prettier --write'
}
