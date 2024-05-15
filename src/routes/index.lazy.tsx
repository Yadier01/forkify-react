import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { Recipes } from '../components/recipe';
import { useState } from 'react';



export const Route = createLazyFileRoute('/')({
  component: Index,
})



function Index() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['recipes'],
    queryFn: async () => {
      const response = await axios.get(
        'https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=d1b3880e-4b2b-46b7-af28-4672211fb482'
      );
      return response.data.data.recipes;
    },
  });

  if (error) return "error"
  const paginatedData = data ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize) : [];

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data?.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRecipeClick = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data...</div>;

  return (
    <div className="bg-white py-4 flex flex-col max-w-screen-xl rounded-2xl w-full">
      <header className='bg-red-400 w-full'>
        <nav>
          <input />
        </nav>
      </header>

      <main className="bg-white py-4 flex max-w-screen-xl rounded-2xl w-full">
        <div className='flex min-h-[61rem] flex-col justify-between'>
          <ul className="w-72  space-y-4 ">
            {paginatedData.map((recipe) => (
              <li
                onClick={() => handleRecipeClick(recipe.id)}
                key={recipe.id}
                className="hover:bg-zinc-400  transition-all p-4 hover:cursor-pointer flex gap-3 items-center"
              >
                <img src={recipe.image_url} className="h-10 rounded-full w-10" alt={recipe.title} />
                <div className="truncate">
                  <h3 className="text-[#f38e82] text-ellipsis overflow-hidden">{recipe.title}</h3>
                  <p className="text-gray-500">{recipe.publisher}</p>
                </div>
              </li>
            ))}

          </ul>

          <div className="flex p-4 justify-between">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              {currentPage} / {Math.ceil(data?.length / pageSize) || 1}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === Math.ceil(data?.length / pageSize)}>
              Next
            </button>
          </div>
        </div>

        <Recipes id={selectedRecipeId} />
    </div>

    </main >

  );

}

