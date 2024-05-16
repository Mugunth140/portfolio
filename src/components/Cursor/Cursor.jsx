'use client'; 
import dynamic from 'next/dynamic';
const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
    ssr: false,
});

const Cursor = () => {

  return (
    <AnimatedCursor
      innerSize={10}
      outerSize={40}
      color='10, 10, 10'
      outerAlpha={1}
      innerScale={0.7}
      outerScale={2}
      hasBlendMode={true}
      outerStyle={{
        border: '2px solid black',
        mixBlendMode: 'difference',
      }}
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        'Link'
      ]}
    />
  )
}

export default Cursor
