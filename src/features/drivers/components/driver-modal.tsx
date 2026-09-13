"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useAddDriver } from "@/features/drivers/hooks/use-add-driver";
import { addDriverSchema, getDriverFieldErrors, type AddDriverPayload, type AddDriverErrors } from "@/features/drivers/schemas/add-driver-schema";
import type { Driver } from "@/features/drivers/types/driver";

type DriverModalProps = { onClose: () => void; onSuccess: (driver: Driver) => void };
const initialValues: AddDriverPayload = {
  name: "", phone: "", nationalId: "", hub: "Cairo Hub 4",
  vehicle: "Mercedes-Benz", plateNumber: "", vehicleColor: "Arctic White",
};
const inputClass = "h-[30px] w-full min-w-0 rounded-xl border border-transparent bg-[#f1f5f9] px-3 text-[10px] text-text-primary outline-none placeholder:text-[#94a8c3] focus:border-primary focus:ring-2 focus:ring-primary/10";

export default function DriverModal({ onClose, onSuccess }: DriverModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [values, setValues] = useState<AddDriverPayload>(initialValues);
  const [errors, setErrors] = useState<AddDriverErrors>({});
  const mutation = useAddDriver();

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function updateValue<K extends keyof AddDriverPayload>(field: K, value: AddDriverPayload[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mutation.isPending) return;
    const result = addDriverSchema.safeParse(values);
    if (!result.success) {
      setErrors(getDriverFieldErrors(result.error));
      return;
    }
    setErrors({});
    try {
      const driver = await mutation.mutateAsync(result.data);
      setValues(initialValues);
      onSuccess(driver);
      onClose();
    } catch {
      // useMutation exposes the submit error; retain all entered values.
    }
  }

  function field(fieldName: keyof AddDriverPayload, label: string, control: ReactNode, required = false) {
    return <div className="min-w-0">
      <label className="mb-1.5 block text-[9px] text-[#34445f]" htmlFor={fieldName}>{label}{required && <span className="ml-1 text-destructive">*</span>}</label>
      {control}
      {errors[fieldName] && <p role="alert" id={fieldName + "-error"} className="mt-1 text-[10px] text-destructive">{errors[fieldName]}</p>}
    </div>;
  }

  function textInput(fieldName: "name" | "nationalId" | "plateNumber", placeholder: string) {
    return <input id={fieldName} className={inputClass} value={values[fieldName]} placeholder={placeholder} aria-required="true" aria-invalid={Boolean(errors[fieldName])} aria-describedby={errors[fieldName] ? fieldName + "-error" : undefined} onChange={(event) => updateValue(fieldName, event.target.value)} />;
  }

  function select(fieldName: "hub" | "vehicle" | "vehicleColor", options: string[]) {
    return <div className="relative">
      {fieldName === "vehicleColor" && <span aria-hidden="true" className="absolute left-3 top-2.5 size-2.5 rounded-full border border-border/30" style={{ backgroundColor: values.vehicleColor === "Arctic White" ? "white" : values.vehicleColor === "Black" ? "#222" : "#b8bdc4" }} />}
      <select id={fieldName} className={inputClass + " appearance-none pr-8" + (fieldName === "vehicleColor" ? " pl-7" : "")} value={values[fieldName]} aria-invalid={Boolean(errors[fieldName])} aria-describedby={errors[fieldName] ? fieldName + "-error" : undefined} onChange={(event) => updateValue(fieldName, event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      <svg aria-hidden="true" className="pointer-events-none absolute right-3 top-2.5 size-3 text-text-secondary" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="m5 7 5 5 5-5" /></svg>
    </div>;
  }

  function photo(fieldName: "driverPhoto" | "vehiclePhoto", label: string) {
    return field(fieldName, label, <div className="flex min-h-[66px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#e1e8f0] bg-[#f8fafc] px-3 py-2">
      <label className="cursor-pointer rounded-lg border border-[#e1e8f0] bg-white px-3 py-1 text-[10px] text-black focus-within:ring-2 focus-within:ring-primary" htmlFor={fieldName}>
        Upload Photo
        <input id={fieldName} aria-label={label} aria-invalid={Boolean(errors[fieldName])} aria-describedby={fieldName + "-help" + (errors[fieldName] ? " " + fieldName + "-error" : "")} type="file" accept="image/png,image/jpeg" className="sr-only" onChange={(event) => updateValue(fieldName, event.target.files?.[0])} />
      </label>
      <p id={fieldName + "-help"} className="max-w-full truncate text-[9px] text-[#94a8c3]">{values[fieldName]?.name ?? "PNG, JPG up to 5MB"}</p>
    </div>);
  }

  return (
    <dialog ref={dialogRef} aria-labelledby="add-driver-title" aria-describedby="add-driver-description" onCancel={(event) => { event.preventDefault(); if (!mutation.isPending) onClose(); }} className="fixed inset-0 m-auto max-h-[calc(100dvh-16px)] w-[calc(100%-16px)] max-w-[454px] overflow-y-auto rounded-[14px] border border-[#dce3ec] bg-white p-[22px] text-text-primary shadow-xl backdrop:bg-black/40">
      <div className="flex items-start justify-between gap-3 border-b border-[#f1f5f9] pb-3">
        <div>
          <h2 id="add-driver-title" className="text-[16px] font-semibold tracking-tight">Add New Driver</h2>
          <p id="add-driver-description" className="mt-1 text-[10px] text-[#7387a5]">Enter driver details and assign a vehicle to register in the fleet.</p>
        </div>
        <button type="button" aria-label="Close add driver modal" disabled={mutation.isPending} onClick={onClose} className="grid size-[26px] shrink-0 place-items-center rounded-lg border border-[#e1e8f0] text-[#94a8c3] hover:bg-background disabled:opacity-50">
          <svg aria-hidden="true" className="size-3" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="m5 5 10 10M15 5 5 15" /></svg>
        </button>
      </div>
      <form noValidate onSubmit={handleSubmit}>
        <fieldset disabled={mutation.isPending} className="min-w-0 space-y-2.5 border-b border-[#f1f5f9] pb-3 pt-4">
          <legend className="sr-only">Driver information</legend>
          <h3 className="text-[9px] font-medium tracking-wider text-[#8b9fba]">DRIVER INFORMATION</h3>
          {photo("driverPhoto", "Driver Photo")}
          {field("name", "Full Name", textInput("name", "e.g. Tarek Mostafa"), true)}
          <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
            {field("phone", "Phone Number", <div className="relative"><span className="absolute left-3 top-2 text-[10px] text-[#7387a5]">+20</span><input id="phone" type="tel" className={inputClass + " pl-10"} value={values.phone} placeholder="100 123 4567" aria-required="true" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} onChange={(event) => updateValue("phone", event.target.value)} /></div>, true)}
            {field("nationalId", "National ID / License", textInput("nationalId", "e.g. 29408151200341"), true)}
          </div>
          {field("hub", "Assigned Hub / City", select("hub", ["Cairo Hub 4", "Giza Hub", "Alexandria Hub"]))}
        </fieldset>
        <fieldset disabled={mutation.isPending} className="min-w-0 space-y-2.5 border-b border-[#f1f5f9] pb-3 pt-3">
          <legend className="sr-only">Vehicle details</legend>
          <h3 className="text-[9px] font-medium tracking-wider text-[#8b9fba]">VEHICLE DETAILS</h3>
          {photo("vehiclePhoto", "Vehicle Photo")}
          <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
            {field("vehicle", "Vehicle Brand", select("vehicle", ["Mercedes-Benz", "Ford", "Peugeot", "Renault", "Iveco", "Fiat", "Nissan", "Toyota", "Hyundai"]), true)}
            {field("plateNumber", "Plate Number", textInput("plateNumber", "e.g. 4921 CAI / ق م س ٤٩٢١"), true)}
          </div>
          {field("vehicleColor", "Vehicle Color", select("vehicleColor", ["Arctic White", "Black", "Silver"]))}
        </fieldset>
        {mutation.isError && <p role="alert" className="mt-3 text-[11px] text-destructive">{mutation.error.message || "Could not add driver. Please try again."}</p>}
        <div className="flex justify-end gap-2 pt-3">
          <button type="button" disabled={mutation.isPending} onClick={onClose} className="h-[30px] rounded-lg border border-[#e1e8f0] px-4 text-[10px] text-[#34445f] disabled:opacity-50">Cancel</button>
          <button type="submit" disabled={mutation.isPending} className="h-[30px] rounded-lg bg-primary px-5 text-[10px] font-medium text-primary-foreground hover:bg-primary-hover disabled:cursor-wait disabled:opacity-60">{mutation.isPending ? "Adding Driver..." : "Add Driver"}</button>
        </div>
      </form>
    </dialog>
  );
}
