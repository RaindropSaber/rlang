import { customAlphabet } from 'nanoid'

const getId = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 32)

export default (prefix: string = '', size = 32) => prefix + '@' + getId(size)
