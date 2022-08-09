import Ajv, { JTDSchemaType } from 'ajv/dist/jtd'

const ajv = new Ajv()

export const parseLocalStorage = <T>(key: string, schema: JTDSchemaType<T>): T | undefined => {
  const json = window.localStorage.getItem(key)
  if (json === null) {
    return
  }
  const parse = ajv.compileParser(schema)
  const obj = parse(json)
  if (obj === undefined) {
    console.warn(`invalid JSON of localStorage key ${key}`, parse.message, parse.position)
    return
  }
  return obj
}
