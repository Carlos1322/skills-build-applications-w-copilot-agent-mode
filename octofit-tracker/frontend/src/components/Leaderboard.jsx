import CollectionView from './CollectionView.jsx'
import { fetch } from '../api.js'

const columns = [
  { key: 'score', label: 'Score' },
  { key: 'userId', label: 'User' },
  { key: 'teamId', label: 'Team' },
  { key: 'period', label: 'Period' },
]

export default function Leaderboard() {
  return (
    <CollectionView
      columns={columns}
      description="See how individual effort adds up on the leaderboard."
      endpoint="/api/leaderboard/"
      fetcher={fetch}
      title="Leaderboard"
    />
  )
}
