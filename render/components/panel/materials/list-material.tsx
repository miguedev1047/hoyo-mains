import { fetcher } from '@/utils/helpers/fetcher'
import { Material } from '@prisma/client'
import { usePathname, useSearchParams } from 'next/navigation'
import { filterSearch } from '@/utils/helpers/filter-search'
import ItemMaterial from '@/render/components/panel/materials/item-material'
import AlertError from '@/render/components/UI/errors/alert-error'
import NoItems from '@/render/components/UI/no-items'
import PanelLoader from '@/render/components/UI/loaders/panel-loader'
import useSWR from 'swr'

const MaterialList = ({ searchValue }: { searchValue: string }) => {
  const pathanme = usePathname()
  const searchParams = useSearchParams()

  const url = `${pathanme}?${searchParams}`
  const queryParams = url.split('?')[1]

  // Fetch materials
  const {
    data: materials,
    isLoading,
    error
  } = useSWR<Material[]>(`/api/materials?${queryParams}`, fetcher)

  const filteredMaterial = filterSearch(searchValue, materials)

  // Condicionales de renderizado
  if (error)
    return <AlertError message='Hubo un problema al cargar los materiales.' />

  if (isLoading) return <PanelLoader />

  if (!materials?.length)
    return <NoItems message='No hay materiales para mostrar' />

  if (!filteredMaterial?.length)
    return <NoItems message='No se ha podido encontrar este material.' />

  return (
    <ol className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {filteredMaterial?.map((material) => (
        <ItemMaterial key={material.id} material={material} />
      ))}
    </ol>
  )
}

export default MaterialList
