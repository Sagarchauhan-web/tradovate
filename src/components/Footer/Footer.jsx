import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useState } from 'react';
import Policy from './Policy';
import TermsAndServices from './TermsAndServices';
import ContactUs from './ContactUs';

function Footer() {
  const [dialogBox, setDialogBox] = useState(false);
  const [policy, setPolicy] = useState('');
  return (
    <div className='w-full'>
      <Dialog open={dialogBox} onOpenChange={setDialogBox}>
        {(policy === 'terms' || policy === 'privacy') && (
          <DialogContent className='max-w-full h-[95%] w-[95%] overflow-y-scroll rounded-xl'>
            <DialogHeader>
              {policy === 'terms' && <TermsAndServices />}
              {policy === 'privacy' && <Policy />}
            </DialogHeader>
          </DialogContent>
        )}
        {policy === 'contactus' && (
          <DialogContent className='sm:max-w-[525px] p-5'>
            <DialogHeader>
              <ContactUs />
            </DialogHeader>
          </DialogContent>
        )}
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
              setPolicy('contactus');
            }}
          >
            Contact Us
          </li>
          <div className='w-[1px] h-4 bg-white ' />
          <li
            className='text-primary cursor-pointer hover:underline text-white'
            onClick={() => {
              setDialogBox(true);
              setPolicy('terms');
            }}
          >
            Terms of Services
          </li>
          <div className='w-[1px] h-4 bg-white ' />
          <li
            className='text-primary cursor-pointer hover:underline text-white'
            onClick={() => {
              setDialogBox(true);
              setPolicy('privacy');
            }}
          >
            Privacy Policy
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Footer;
