type DriverModalProps = { onClose: () => void };

export default function DriverModal({ onClose }: DriverModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-5">
      <div className="w-full max-w-md rounded-[8px] bg-card p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[20px] font-bold text-text-primary">
              Add Driver
            </h3>
            <p className="mt-2 text-[13px] text-text-secondary">
              This is a UI modal. Backend submission is not connected yet.
            </p>
          </div>

          <button
            aria-label="Close add driver modal"
            className="rounded-[8px] px-2 py-1 text-[20px] leading-none text-text-secondary hover:bg-secondary"
            onClick={onClose}
            type="button"
          >
            x
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <input
            className="h-11 w-full rounded-[8px] border border-input bg-card px-3 text-[14px] outline-none placeholder:text-text-placeholder focus:border-ring focus:ring-2 focus:ring-primary/10"
            placeholder="Driver name"
            type="text"
          />
          <input
            className="h-11 w-full rounded-[8px] border border-input bg-card px-3 text-[14px] outline-none placeholder:text-text-placeholder focus:border-ring focus:ring-2 focus:ring-primary/10"
            placeholder="Phone number"
            type="tel"
          />
          <input
            className="h-11 w-full rounded-[8px] border border-input bg-card px-3 text-[14px] outline-none placeholder:text-text-placeholder focus:border-ring focus:ring-2 focus:ring-primary/10"
            placeholder="Vehicle"
            type="text"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="h-10 rounded-[8px] border border-border px-4 text-[13px] font-semibold text-text-secondary hover:border-border-strong"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="h-10 rounded-[8px] bg-primary px-4 text-[13px] font-semibold text-primary-foreground hover:bg-primary-hover"
            type="button"
          >
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
}
