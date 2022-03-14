import { getBuildID } from 'services/versioning'

export default function handler(req, res) {
  res.status(200).json({ buildId: getBuildID() })
}
