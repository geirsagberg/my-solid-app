import { createSignal } from 'solid-js'

async function dir() {
  'use server'
  const { $ } = await import('execa')
  const info = await $`ls -la`
  console.log('dir from server', info.stdout)
  return info
}

export default function Counter() {
  dir()
  const [count, setCount] = createSignal(0)
  return (
    <button
      class="w-[200px] rounded-full border-2 border-gray-300 bg-gray-100 px-[2rem] py-[1rem] focus:border-gray-400 active:border-gray-400"
      onClick={async () => {
        setCount(count() + 1)
        const data = await dir()
        console.log('dir from browser', data.stdout)
      }}
    >
      Clicks: {count()}
    </button>
  )
}
