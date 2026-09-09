type DriversToolbarProps = {
  isAddDriverOpen: boolean;
  onAddDriverClick: () => void;
  onAddDriverClose: () => void;
  onSearchChange: (value: string) => void;
  searchValue: string;
};

export default function DriversToolbar({
  isAddDriverOpen,
  onAddDriverClick,
  onAddDriverClose,
  onSearchChange,
  searchValue,
}: DriversToolbarProps) {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[26px] font-bold tracking-normal text-text-primary">
            Drivers List
          </h2>
          <p className="mt-2 text-[14px] text-text-secondary">
            Manage delivery agents and vehicle coverage.
          </p>
        </div>

        <button
          className="h-11 rounded-[8px] bg-primary px-5 text-[14px] font-semibold text-primary-foreground transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/25"
          onClick={onAddDriverClick}
          type="button"
        >
          Add Driver
        </button>
      </div>

      <div className="mt-6">
        <label className="sr-only" htmlFor="driversSearch">
          Search drivers
        </label>
        <input
          className="h-12 w-full max-w-md rounded-[8px] border border-input bg-card px-4 text-[14px] text-text-primary outline-none transition placeholder:text-text-placeholder focus:border-ring focus:ring-2 focus:ring-primary/10"
          id="driversSearch"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by driver, phone, or vehicle"
          type="search"
          value={searchValue}
        />
      </div>

      {isAddDriverOpen ? (
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
                onClick={onAddDriverClose}
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
                onClick={onAddDriverClose}
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
      ) : null}
    </>
  );
}
