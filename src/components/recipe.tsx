import { useQuery } from '@tanstack/react-query'
import axios from 'axios'




export const Recipes = (id: { id: string | null }) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['recipe', id],
    refetchOnMount: false,
    retry: false,
    networkMode: 'offlineFirst',
    queryFn: () =>
      axios
        .get(`https://forkify-api.herokuapp.com/api/v2/recipes/${id.id}`)
        .then((res) => res.data),
  })

  if (isPending) return 'Loading...'
  if (isFetching) return "Fetching..."
  if (error) return 'Please select a recipe'

  return (
    <div className='w-full g-red-400'>fetch{data.data.recipe?.publisher}</div>
  )
}
