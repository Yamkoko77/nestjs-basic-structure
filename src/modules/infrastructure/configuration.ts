export default (): Record<string, any> => ({
  provider: process.env.PROVIDER || 'Basic Structure',
  port: parseInt(process.env.PORT, 10) || 3000,
  authentication: {
    secret: process.env.SECRET_KEY || 'YamkokoHandsome',
    jwtOptions: {
      header: {
        typ: 'access',
      },
      audience: 'http://localhost',
      algorithm: 'HS256',
      expiresIn: '1d',
    },
  },
})
