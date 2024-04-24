import { DialogDescription, DialogTitle } from '../ui/dialog';

function RefundPolicy() {
  return (
    <>
      <DialogTitle className='mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
        Payment, refunds, and plan changes
      </DialogTitle>
      <DialogDescription>
        <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
          <li>
            If you are using a free version of the Services, it is really free:
            we do not ask you for your credit card and — just like for users who
            pay for our Services — we do not sell your data.
          </li>
          <li>
            For paid Services that offer a free trial, we explain the length of
            trial when you sign up. After the trial period, you need to pay in
            advance to keep using the Service. If you do not pay, we downgrade
            your account to a free account.
          </li>
          <li>
            If you are upgrading from a free plan to a paid plan, we will charge
            your card immediately and your billing cycle starts on the day of
            upgrade.
          </li>
          <li>
            All fees are inclusive of all taxes, levies, or duties imposed by
            taxing authorities. Where required, we will collect those taxes on
            behalf of the taxing authority and remit those taxes to taxing
            authorities.
          </li>
        </ul>
        <p>
          We process refunds on a case-by-case basis in 15 days. If you’re ever
          unhappy with our Services for any reason, just contact our support
          team and we’ll take care of you.
        </p>
      </DialogDescription>
    </>
  );
}
export default RefundPolicy;
