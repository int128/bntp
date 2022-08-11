import './component.css'
import React, { Dispatch, FC } from 'react'

type SearchComponentProps = {
  value: string
  onChange: Dispatch<string>
}

const SearchComponent: FC<SearchComponentProps> = ({ value, onChange }) => {
  return (
    <div className="Search">
      <input
        type="text"
        value={value}
        placeholder="Search bookmarks..."
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onChange('')
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
