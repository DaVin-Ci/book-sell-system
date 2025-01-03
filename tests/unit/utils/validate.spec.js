import { validAccount, isExternal } from '@/utils/validate.js'

describe('Utils:validate', () => {
  it('validAccount', () => {
    expect(validAccount('admin')).toBe(true)
    expect(validAccount('editor')).toBe(true)
    expect(validAccount('xxxx')).toBe(false)
  })
  it('isExternal', () => {
    expect(isExternal('https://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(isExternal('http://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(isExternal('github.com/PanJiaChen/vue-element-admin')).toBe(false)
    expect(isExternal('/dashboard')).toBe(false)
    expect(isExternal('./dashboard')).toBe(false)
    expect(isExternal('dashboard')).toBe(false)
  })
})
