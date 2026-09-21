"use client";

import { useDriverFormError } from "@/features/drivers/hooks/use-driver-form-error";
import { useTranslations } from "next-intl";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useAddDriver } from "@/features/drivers/hooks/use-add-driver";
import { addDriverSchema, updateDriverSchema, getDriverFieldErrors, type AddDriverPayload, type AddDriverErrors } from "@/features/drivers/schemas/add-driver-schema";
import { useUpdateDriver } from "@/features/drivers/hooks/use-update-driver";
import type { Driver } from "@/features/drivers/types/driver";

type DriverModalProps = { driver?: Driver; onClose: () => void; onSuccess: (driver: Driver) => void };
const initialValues: AddDriverPayload = {
  name: "", phone: "", nationalId: "", hub: "Cairo Hub 4",
  vehicle: "Mercedes-Benz", plateNumber: "", vehicleColor: "Arctic White",
};
const inputClass = "h-[30px] w-full min-w-0 rounded-xl border border-transparent bg-secondary px-3 text-[10px] text-text-primary outline-none placeholder:text-text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/10";

export default function DriverModal({ driver, onClose, onSuccess }: DriverModalProps) {
  const t = useTranslations("driverForm");
  const translateError = useDriverFormError();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [values, setValues] = useState<AddDriverPayload>(() => driver ? {
    name: driver.name, phone: driver.phone, nationalId: driver.nationalId ?? "", hub: driver.hub ?? "",
    vehicle: driver.vehicle, plateNumber: driver.plateNumber ?? "", vehicleColor: driver.vehicleColor ?? "",
  } : initialValues);
  const [errors, setErrors] = useState<AddDriverErrors>({});
  const addMutation = useAddDriver();
  const updateMutation = useUpdateDriver(driver?.id ?? "");
  const mutation = driver ? updateMutation : addMutation;
  const submitting = useRef(false);

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
    if (mutation.isPending || submitting.current) return;
    const result = (driver ? updateDriverSchema : addDriverSchema).safeParse(values);
    if (!result.success) {
      setErrors(getDriverFieldErrors(result.error));
      return;
    }
    setErrors({});
    submitting.current = true;
    try {
      const driver = await mutation.mutateAsync(result.data);
      setValues(initialValues);
      onSuccess(driver);
      onClose();
    } catch {
      // useMutation exposes the submit error; retain all entered values.
    } finally { submitting.current = false; }
  }

  function field(fieldName: keyof AddDriverPayload, label: string, control: ReactNode, required = false) {
    return <div className="min-w-0">
      <label className="mb-1.5 block text-[9px] text-[#34445f]" htmlFor={fieldName}>{label}{required && <span className="ms-1 text-destructive">*</span>}</label>
      {control}
      {errors[fieldName] && <p role="alert" id={fieldName + "-error"} className="mt-1 text-[10px] text-destructive">{translateError(errors[fieldName])}</p>}
    </div>;
  }

  function textInput(fieldName: "name" | "nationalId" | "plateNumber", placeholder: string) {
    return <input id={fieldName} className={inputClass} value={values[fieldName]} placeholder={placeholder} aria-required={!driver || fieldName === "name"} aria-invalid={Boolean(errors[fieldName])} aria-describedby={errors[fieldName] ? fieldName + "-error" : undefined} onChange={(event) => updateValue(fieldName, event.target.value)} />;
  }

  function select(fieldName: "hub" | "vehicle" | "vehicleColor", options: string[]) {
    return <div className="relative">
      {fieldName === "vehicleColor" && <span aria-hidden="true" className="absolute start-3 top-2.5 size-2.5 rounded-full border border-border/30" style={{ backgroundColor: values.vehicleColor === "Arctic White" ? "white" : values.vehicleColor === "Black" ? "#222" : "#b8bdc4" }} />}
      <select id={fieldName} className={inputClass + " appearance-none pe-8" + (fieldName === "vehicleColor" ? " ps-7" : "")} value={values[fieldName]} aria-invalid={Boolean(errors[fieldName])} aria-describedby={errors[fieldName] ? fieldName + "-error" : undefined} onChange={(event) => updateValue(fieldName, event.target.value)}>
        {Array.from(new Set([values[fieldName], ...options])).map((option) => <option key={option} value={option}>{option ? (fieldName === "vehicleColor" && t.has(option) ? t(option) : option) : t("notRecorded")}</option>)}
      </select>
      <svg aria-hidden="true" className="pointer-events-none absolute end-3 top-2.5 size-3 text-text-secondary" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="m5 7 5 5 5-5" /></svg>
    </div>;
  }

  function photo(fieldName: "driverPhoto" | "vehiclePhoto", label: string) {
    return field(fieldName, label, <div className="flex min-h-[66px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-secondary px-3 py-2">
      <label className="cursor-pointer rounded-lg border border-border bg-card px-3 py-1 text-[10px] text-text-primary focus-within:ring-2 focus-within:ring-primary" htmlFor={fieldName}>
        {t("upload")}
        <input id={fieldName} aria-label={label} aria-invalid={Boolean(errors[fieldName])} aria-describedby={fieldName + "-help" + (errors[fieldName] ? " " + fieldName + "-error" : "")} type="file" accept="image/png,image/jpeg" className="sr-only" onChange={(event) => updateValue(fieldName, event.target.files?.[0])} />
      </label>
      <p id={fieldName + "-help"} className="max-w-full truncate text-[9px] text-[#94a8c3]">{values[fieldName]?.name ?? t("photoHelp")}</p>
    </div>);
  }

  return (
    <dialog ref={dialogRef} aria-labelledby="add-driver-title" aria-describedby="add-driver-description" onCancel={(event) => { event.preventDefault(); if (!mutation.isPending) onClose(); }} className="fixed inset-0 m-auto max-h-[calc(100dvh-16px)] w-[calc(100%-16px)] max-w-[454px] overflow-y-auto rounded-[14px] border border-border bg-card p-[22px] text-text-primary shadow-xl backdrop:bg-black/40">
      <div className="flex items-start justify-between gap-3 border-b border-[#f1f5f9] pb-3">
        <div>
          <h2 id="add-driver-title" className="text-[16px] font-semibold tracking-tight">{driver ? t("editTitle") : t("addTitle")}</h2>
          <p id="add-driver-description" className="mt-1 text-[10px] text-[#7387a5]">{driver ? t("editDescription") : t("addDescription")}</p>
        </div>
        <button type="button" aria-label={driver ? t("closeEdit") : t("closeAdd")} disabled={mutation.isPending} onClick={onClose} className="grid size-[26px] shrink-0 place-items-center rounded-lg border border-[#e1e8f0] text-[#94a8c3] hover:bg-background disabled:opacity-50">
          <svg aria-hidden="true" className="size-3" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="m5 5 10 10M15 5 5 15" /></svg>
        </button>
      </div>
      <form noValidate onSubmit={handleSubmit}>
        <fieldset disabled={mutation.isPending} className="min-w-0 space-y-2.5 border-b border-[#f1f5f9] pb-3 pt-4">
          <legend className="sr-only">{t("driverInformation")}</legend>
          <h3 className="text-[9px] font-medium tracking-wider text-[#8b9fba]">{t("driverInformationHeading")}</h3>
          {photo("driverPhoto", t("driverPhoto"))}
          {field("name", t("fullName"), textInput("name", t("nameExample")), true)}
          <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
            {field("phone", t("phone"), <div className="relative">{!driver && <span className="absolute start-3 top-2 text-[10px] text-[#7387a5]">+20</span>}<input id="phone" type="tel" className={inputClass + (driver ? "" : " ps-10")} value={values.phone} placeholder="100 123 4567" aria-required="true" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} onChange={(event) => updateValue("phone", event.target.value)} /></div>, true)}
            {field("nationalId", t("nationalId"), textInput("nationalId", t("idExample")), !driver)}
          </div>
          {field("hub", t("hub"), select("hub", ["Cairo Hub 4", "Giza Hub", "Alexandria Hub"]))}
        </fieldset>
        <fieldset disabled={mutation.isPending} className="min-w-0 space-y-2.5 border-b border-[#f1f5f9] pb-3 pt-3">
          <legend className="sr-only">{t("vehicleDetails")}</legend>
          <h3 className="text-[9px] font-medium tracking-wider text-[#8b9fba]">{t("vehicleDetailsHeading")}</h3>
          {photo("vehiclePhoto", t("vehiclePhoto"))}
          <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
            {field("vehicle", t("vehicle"), select("vehicle", ["Mercedes-Benz", "Ford", "Peugeot", "Renault", "Iveco", "Fiat", "Nissan", "Toyota", "Hyundai"]), true)}
            {field("plateNumber", t("plate"), textInput("plateNumber", t("plateExample")), !driver)}
          </div>
          {field("vehicleColor", t("color"), select("vehicleColor", ["Arctic White", "Black", "Silver"]))}
        </fieldset>
        {mutation.isError && <p role="alert" className="mt-3 text-[11px] text-destructive">{translateError(mutation.error.message)}</p>}
        <div className="flex justify-end gap-2 pt-3">
          <button type="button" disabled={mutation.isPending} onClick={onClose} className="h-[30px] rounded-lg border border-[#e1e8f0] px-4 text-[10px] text-[#34445f] disabled:opacity-50">{t("cancel")}</button>
          <button type="submit" disabled={mutation.isPending} className="h-[30px] rounded-lg bg-primary px-5 text-[10px] font-medium text-primary-foreground hover:bg-primary-hover disabled:cursor-wait disabled:opacity-60">{driver ? (mutation.isPending ? t("saving") : t("save")) : (mutation.isPending ? t("adding") : t("add"))}</button>
        </div>
      </form>
    </dialog>
  );
}
