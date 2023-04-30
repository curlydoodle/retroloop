import { Retrospective } from '@prisma/client'
import * as Toast from '@radix-ui/react-toast'
import { IconArrowRight, IconCopy } from '@tabler/icons-react'
import { useState } from 'react'

type ActionButtonsProps = {
  retrospective: Retrospective
  handleUpdateRetro: (input: Retrospective) => void
}

export function ActionButtons({ retrospective, handleUpdateRetro }: ActionButtonsProps) {
  const [open, setOpen] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href)
    setOpen(true)
  }

  function handleNextPhase() {
    retrospective.phase === 'WRITING'
      ? handleUpdateRetro({
          ...retrospective,
          id: retrospective.id,
          phase: 'VOTING',
        })
      : null

    // Disabled for now
    // retrospective.phase === 'GROUPING'
    //   ? handleUpdateRetro({
    //       ...retrospective,
    //       id: retrospective.id,
    //       phase: 'VOTING',
    //     })
    //   : null

    retrospective.phase === 'VOTING'
      ? handleUpdateRetro({
          ...retrospective,
          id: retrospective.id,
          phase: 'DISCUSSING',
        })
      : null

    retrospective.phase === 'DISCUSSING'
      ? handleUpdateRetro({
          ...retrospective,
          id: retrospective.id,
          phase: 'DISCUSSING',
        })
      : null
  }

  return (
    <div className='flex'>
      <Toast.Provider swipeDirection='right'>
        <button className='btn' type='submit' aria-label='Start Retro' onClick={handleCopy}>
          <div className='flex flex-row items-center gap-2 p-5 text-lg shadow-md'>
            Copy Retro link
            <IconCopy />
          </div>
        </button>

        <Toast.Root open={open} onOpenChange={setOpen}>
          <Toast.Title className='flex items-center gap-2 text-md'>
            <span>Copied retrospective link to clipboard!</span>
            <IconCopy />
          </Toast.Title>
        </Toast.Root>

        {open ? (
          <Toast.Viewport className='fixed bottom-0 right-0 gap-2 p-5 m-5 border-2 rounded-md bg-base-light dark:bg-base-dark dark:text-base-light border-base-dark text-base-dark w-fit dark:border-base-light ' />
        ) : null}
      </Toast.Provider>

      <button type='submit' aria-label='Start Retro' className='mx-2 btn' onClick={handleNextPhase}>
        <div className='flex flex-row items-center gap-2 p-5 text-lg shadow-md'>
          Next Phase
          <IconArrowRight />
        </div>
      </button>
    </div>
  )
}
