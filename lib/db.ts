import mysql, { type Pool } from 'mysql2/promise'

type DbConfig = {
  host: string
  port: number
  database: string
  user: string
  password: string
}

declare global {
  var mauriDbPool: Pool | undefined
}

function readDbConfig(): DbConfig {
  const host = process.env.DB_HOST ?? process.env.MYSQL_HOST
  const database = process.env.DB_NAME ?? process.env.MYSQL_DATABASE
  const user = process.env.DB_USER ?? process.env.MYSQL_USER
  const password = process.env.DB_PASSWORD ?? process.env.MYSQL_PASSWORD
  const portText = process.env.DB_PORT ?? process.env.MYSQL_PORT ?? '3306'
  const port = Number(portText)

  if (!host || !database || !user || !password) {
    throw new Error(
      'Missing database environment variables. Set DB_HOST, DB_NAME, DB_USER, and DB_PASSWORD.',
    )
  }

  if (!Number.isInteger(port) || port < 1) {
    throw new Error('DB_PORT must be a valid positive port number.')
  }

  return { host, port, database, user, password }
}

export function getDbPool() {
  if (!globalThis.mauriDbPool) {
    const config = readDbConfig()
    const useSsl = process.env.DB_SSL === 'true' || process.env.MYSQL_SSL === 'true'

    globalThis.mauriDbPool = mysql.createPool({
      ...config,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      ssl: useSsl ? { rejectUnauthorized: true } : undefined,
    })
  }

  return globalThis.mauriDbPool
}
