import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FaRegClipboard } from 'react-icons/fa';
import { IoMdCheckmark } from 'react-icons/io';

import { useState } from 'react';
export const CodeClipboard = ({ codeString }) => {
  const [copy, setCopy] = useState(false);
  return (
    <div className='bg-[#3a404d] rounded-md overflow-hidden'>
      <div className='flex justify-between px-4 py-2 text-white text-xs items-center'>
        <p className='text-sm'>Code</p>
        {copy ? (
          <button className='py-1 inline-flex items-center gap-1'>
            <span className='mr-1'>
              <IoMdCheckmark />
            </span>
            Copy code
          </button>
        ) : (
          <button
            className='py-1 inline-flex items-center gap-1'
            onClick={() => {
              navigator.clipboard.writeText(codeString);
              setCopy(true);
              setTimeout(() => {
                setCopy(false);
              }, 3000);
            }}
          >
            <span className='mr-1'>
              <FaRegClipboard />
            </span>
            Copy code
          </button>
        )}
      </div>
      <SyntaxHighlighter
        language='javascript'
        style={atomOneDark}
        customStyle={{ padding: '2rem' }}
        wrapLongLines={true}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};
