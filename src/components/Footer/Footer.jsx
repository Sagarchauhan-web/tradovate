import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useState } from 'react';
import Policy from './Policy';
import TermsAndServices from './TermsAndServices';
import RefundPolicy from './RefundPolicy';

function Footer() {
  const [dialogBox, setDialogBox] = useState(false);
  const [policy, setPolicy] = useState('');
  return (
    <div className='w-full'>
      <Dialog open={dialogBox} onOpenChange={setDialogBox}>
        <DialogContent className='max-w-full h-[95%] w-[95%] overflow-y-scroll rounded-xl'>
          <DialogHeader>
            {policy === 'terms' && <TermsAndServices />}
            {policy === 'privacy' && <Policy />}
            {policy === 'refund' && <RefundPolicy />}
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <ul className='flex flex-wrap justify-between bg-primary items-center h-[50px] px-10 border-t'>
        <div className='flex gap-6 text-white'>
          <li className='text-white'>
            Copyright © 2024 Tradovate. All Rights Reserved.
          </li>
        </div>
        <div className='flex gap-2 justify-center items-center '>
          <li
            className='text-primary cursor-pointer hover:underline text-white'
            onClick={() => {
              setDialogBox(true);
              setPolicy('terms');
            }}
          >
            Terms of Services
          </li>
          <div className='w-[1px] h-4 bg-primary ' />
          <li
            className='text-primary cursor-pointer hover:underline text-white'
            onClick={() => {
              setDialogBox(true);
              setPolicy('privacy');
            }}
          >
            Privacy Policy
          </li>
          <div className='w-[1px] h-4 bg-primary' />
          <li
            className='text-primary cursor-pointer hover:underline text-white'
            onClick={() => {
              setDialogBox(true);
              setPolicy('refund');
            }}
          >
            Refund Policy
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Footer;
