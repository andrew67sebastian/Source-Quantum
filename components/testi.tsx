import React from 'react'
import Image from 'next/image'

export default function Testi(){
  return (
    <div className="max-w-7xl grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-6 justify-center">
    <Image src="/aster.png" alt="aster" width={450} height={450} />
    <Image src="/avnt.png" alt="avantis" width={450} height={450} />
    <Image src="/CRWD.png" alt="crowdstrike" width={450} height={450} />
    <Image src="/ZORA.png" alt="zora" width={450} height={450} />
  </div>
  )
}
