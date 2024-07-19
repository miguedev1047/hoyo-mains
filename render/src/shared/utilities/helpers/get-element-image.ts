import { Anemo, Cryo, Dendro, Electro, Geo, Hydro, Pyro } from '@/assets'

export function getElementImage(element: string) {
  if (element === 'anemo') return Anemo.src
  if (element === 'geo') return Geo.src
  if (element === 'hydro') return Hydro.src
  if (element === 'pyro') return Pyro.src
  if (element === 'cryo') return Cryo.src
  if (element === 'electro') return Electro.src
  if (element === 'dendro') return Dendro.src

  return null
}
