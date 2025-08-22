import { Button } from "@/components/Button";
import RatingReview from "@/components/RatingReview";
import React, { useState } from "react";


type PaymentStatus = "success" | "failed" | "pending";

export interface BookingConfirmationProps {
  amount: number;
  currency?: string;
  date: Date | string;
  transactionId: string;
  status?: PaymentStatus;
  brandName?: string;
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
    <circle
      cx="12"
      cy="12"
      r="11"
      stroke="currentColor"
      strokeWidth="2"
      opacity={0.18}
    />
    <path
      d="M7 12.5l3.2 3.2L17.5 8.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BadgeDot: React.FC<{ status: PaymentStatus }> = ({ status }) => {
  const map = {
    success: "bg-emerald-500",
    failed: "bg-rose-500",
    pending: "bg-amber-500",
  } as const;
  return (
    <span className={`inline-block h-2.5 w-2.5 rounded-full ${map[status]}`} />
  );
};

const fmtMoney = (n: number, currency = "USD") =>
  new Intl.NumberFormat(undefined, { style: "currency", currency }).format(n);

const fmtDate = (d: Date | string) =>
  new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(typeof d === "string" ? new Date(d) : d);

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  amount,
  currency = "INR",
  date,
  transactionId,
  status = "success",
  brandName = "Usecheckin",
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const statusLabel =
    status === "success"
      ? "Success"
      : status === "failed"
      ? "Failed"
      : "Pending";

  return (
     <>
    {showReviewModal && <RatingReview/>}
    <section className="w-full px-4 md:px-2 py-10 md:py-20 mt-5 md:mt-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 md:p-10 mx-auto max-w  mr-4">
            <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-black/10">
              <span className="text-xl font-extrabold text-black">F</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Booking successfully!
              <br />
            </h1>

            <p className="mt-4 max-w-prose text-base leading-6 text-gray-600 font-JosephicSans">
              Thank you for choosing to book with {brandName}. Your reservation
              is confirmed. If there’s anything you need before your arrival,
              please reach out to your host.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => {
                  setShowReviewModal(true);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-5 py-3 text-base font-JosephicSans text-white bg-deepPurple hover:bg-deepPurple/90 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Go back to home
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl bg-white p-5 shadow-md ring-1 ring-black/5 mx-auto max-w  mr-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {fmtMoney(amount, currency)}
                  </div>
                  <div className="mt-1 text-xs md:text-sm text-gray-500">
                    {status === "success"
                      ? "Payment success!"
                      : status === "failed"
                      ? "Payment failed"
                      : "Payment pending"}
                  </div>
                </div>
                <div
                  className={`grid h-12 w-12 place-items-center rounded-full ${
                    status === "success"
                      ? "text-emerald-600 bg-emerald-50"
                      : status === "failed"
                      ? "text-rose-600 bg-rose-50"
                      : "text-amber-600 bg-amber-50"
                  }`}
                >
                  <CheckIcon className="h-7 w-7" />
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-md ring-1 ring-black/5 mx-auto max-w mr-4">
              <h2 className="text-base font-semibold text-gray-900">
                Payment details
              </h2>

              <dl className="mt-5 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-3 gap-3 py-3">
                  <dt className="col-span-1 text-gray-500">Date</dt>
                  <dd className="col-span-2 text-right font-medium text-gray-900">
                    {fmtDate(date)}
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-3 py-3">
                  <dt className="col-span-1 text-gray-500">Transaction ID</dt>
                  <dd className="col-span-2 text-right font-medium text-gray-900">
                    {transactionId}
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-3 py-3">
                  <dt className="col-span-1 text-gray-500">Amount</dt>
                  <dd className="col-span-2 text-right font-medium text-gray-900">
                    {fmtMoney(amount, currency)}
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-3 py-3">
                  <dt className="col-span-1 text-gray-500">Payment status</dt>
                  <dd className="col-span-2 flex items-center justify-end gap-2 text-right font-medium text-gray-900">
                    <BadgeDot status={status} />
                    {statusLabel}
                  </dd>
                </div>
              </dl>
              <div className="mt-6 flex gap-2 opacity-20">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span key={i} className="h-2 w-6 rounded-full bg-gray-200" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );

};
