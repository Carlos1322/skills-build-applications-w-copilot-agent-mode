import CollectionView from './CollectionView.jsx'
import { fetch } from '../api.js'

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'description', label: 'About' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'exercises', label: 'Exercises' },
]

export default function Workouts() {
  return (
    <CollectionView
      columns={columns}
      description="Choose a workout that fits your goals and energy."
      endpoint="/api/workouts/"
      fetcher={fetch}
      title="Workouts"
    />
  )
}
