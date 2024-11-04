import { IMetadataBreadcrumbs } from '@/types/app-type'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo } from 'react'

const Breadcrumbs = ({ data }: { data: IMetadataBreadcrumbs[] }) => {
  const pathname = usePathname()
  let pathnames = pathname?.split('/').filter((x) => x)

  if (pathnames?.[2] === 'match') {
    pathnames = pathnames.slice(0, -2)
  }

  return (
    <nav className="mb-2.5 px-1.5 py-2 bg-[#f9f9f9]">
      <ul className="breadcrumbs flex items-center">
        {data &&
          data?.map((item, index) => (
            <li key={index}>
              {item.url ? (
                <Link className="text-primary hover:text-red text-sm flex" href={item.url}>
                  {item.name} {index + 1 != data.length && <p className="mx-2">»</p>}
                </Link>
              ) : (
                <p className="text-sm"> {item.name}</p>
              )}
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default memo(Breadcrumbs)
