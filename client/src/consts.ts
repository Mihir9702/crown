export type PostIdProps = {
  header: string
  content: string
  owner: string
}

export const viewStates = {
  section: 'grid gap-6 max-w-[960px]',
  card: 'w-fit bg-[#181A1B] rounded-xl px-5 py-4 shadow-lg shadow-black  cursor-default hover:bg-[#121516]',
  col1: {
    section: 'grid-cols-1',
    card: 'h-[500px] max-w-[500px]',
    image: 'max-h-[400px] w-[400px]',
  },
  col4: {
    section: 'grid-cols-4',
    card: 'h-[300px] max-w-[400px]',
    image: 'max-h-[200px] w-[200px]',
  },
}

export const filler = {
  header: '',
  content: '',
  owner: '',
}
