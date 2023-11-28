import { ChangeEvent, useRef, useState } from 'react'
import { useAutosizeTextArea } from '../hooks/use-autosize-textarea'

export const TextField = () => {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = useState('')

  useAutosizeTextArea(ref, value, { maxRows: 5, scrollbarWidth: 6 })

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        setValue(e.currentTarget.value)
      }
      rows={1}
      placeholder='Type a message'
      className='flex min-h-[42px] max-h-min w-full max-w-sm resize-none overflow-hidden rounded-lg bg-slate-200 px-3 py-2 text-base text-slate-950 outline-0 placeholder:whitespace-nowrap placeholder:text-gray-400'
    />
  )
}
