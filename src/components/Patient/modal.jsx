import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";

const Modal = ({open,setOpen,type}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} type={type} >
      <DialogContent className="max-w-[323px] min-h-[200px] bg-[#FCFDFF] pt-0">
        <div className='flex h-full w-full items-center justify-center'>
          <h1>Loading...</h1>

        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
