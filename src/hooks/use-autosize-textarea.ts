import { RefObject, useEffect } from 'react'

type Cases = {
  [key: string]: () => void
}
type Options = {
  maxRows: number
  scrollbarWidth?: number
}

const getTextAreaLimitHeight = (ref: HTMLTextAreaElement, lines: number) => {
  if (ref) {
    const lineHeight = Number(
        window.getComputedStyle(ref).lineHeight.replace('px', '')
      ),
      paddingTop = Number(
        window.getComputedStyle(ref).paddingTop.replace('px', '')
      ),
      paddingBottom = Number(
        window.getComputedStyle(ref).paddingBottom.replace('px', '')
      ),
      limitHeight = Math.round(
        lines * lineHeight + (paddingTop + paddingBottom)
      )

    return limitHeight
  }

  return 0
}

const handleRows = (refObj: HTMLTextAreaElement, limit: number) => {
  const setRow = (value: number) => {
    refObj.rows = value
  }

  const cases: Cases = {
    limit: () => setRow(limit),
  }

  for (let i = 2; i <= limit; i++) {
    cases[getTextAreaLimitHeight(refObj, i)] = () => setRow(i)
  }

  return cases
}

export const useAutosizeTextArea = (
  ref: RefObject<HTMLTextAreaElement>,
  value: string,
  { maxRows, scrollbarWidth }: Options
) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.rows = 1

      const setRow = handleRows(ref.current, maxRows)[
        ref.current.scrollHeight as keyof typeof handleRows
      ]

      if (
        ref.current.scrollHeight > getTextAreaLimitHeight(ref.current, maxRows)
      ) {
        ref.current.rows = maxRows
        ref.current.style.overflowY = 'scroll'

        if (scrollbarWidth) {
          ref.current.style.paddingRight = `${scrollbarWidth}px`
        }
      } else {
        ref.current.style.removeProperty('overflow-y')
        ref.current.style.removeProperty('padding-right')
      }

      if (setRow) {
        setRow()
      }
    }
  }, [maxRows, ref, scrollbarWidth, value])
}
