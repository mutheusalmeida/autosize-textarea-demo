import { ChangeEvent, useRef, useState } from 'react'
import { useAutosizeTextArea } from '../hooks/use-autosize-textarea'

export const TextField = () => {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = useState('')

  useAutosizeTextArea(ref, value, { maxRows: 5, scrollbarWidth: 6 })

  return (
    <>
      <textarea
        ref={ref}
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setValue(e.currentTarget.value)
        }
        rows={1}
        placeholder='Type a message'
      />
    </>
  )
}
