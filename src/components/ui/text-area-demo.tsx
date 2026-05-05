import { useId } from 'react'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const TextareaWithHelperTextDemo = () => {
  const id = useId()

  return (
    <div className='w-full space-y-2'>
      <Label htmlFor={id}>Agency Feedback</Label>
      <Textarea placeholder='Share your thoughts on AIVoice OS...' id={id} />
      <p className='text-muted-foreground text-xs'>Help us build the perfect medical agency operating system.</p>
    </div>
  )
}

export default TextareaWithHelperTextDemo
