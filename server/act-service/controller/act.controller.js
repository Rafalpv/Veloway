const getActivities = (req, res) => {
  res.status(200).json({ message: 'Hello from Activities Service' })
}

export default {
  getActivities
}
