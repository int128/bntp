import './component.css'
import React, { Dispatch, FC } from 'react'

type SearchComponentProps = {
  searchText: string
  setSearchText: Dispatch<string>
}

const SearchComponent: FC<SearchComponentProps> = ({ searchText, setSearchText }) => {
  return (
    <div className="Search">
      <input
        type="text"
        value={searchText}
        placeholder="Search bookmarks..."
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setSearchText('')
            if (e.target instanceof HTMLInputElement) {
              e.target.blur()
            }
          }
        }}
      />
    </div>
  )
}

export default SearchComponent
