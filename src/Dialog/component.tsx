import { FC, PropsWithChildren, useEffect, useRef } from 'react'

type DialogComponentProps = PropsWithChildren<{
  open: boolean
  onRequestClose: () => void
}>

const DialogComponent: FC<DialogComponentProps> = ({ children, open, onRequestClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (dialogRef.current === null) {
      return
    }
    if (open) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  }, [open])
  return (
    <dialog
      ref={dialogRef}
      onCancel={onRequestClose}
      onClick={(e) => {
        if (dialogRef.current === null) {
          return
        }
        if (!isClickedInRect(e, dialogRef.current.getBoundingClientRect())) {
          onRequestClose()
        }
      }}
    >
      {children}
    </dialog>
  )
}

export default DialogComponent

const isClickedInRect = (e: React.MouseEvent, r: DOMRect): boolean =>
  e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom
