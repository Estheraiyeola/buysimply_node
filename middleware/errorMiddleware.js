export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err && err.message ? err.message : err)
  const statusCode = err && err.statusCode ? err.statusCode : 500
  res.status(statusCode).json({
    message: err && err.message ? err.message : 'Server Error'
  })
}
