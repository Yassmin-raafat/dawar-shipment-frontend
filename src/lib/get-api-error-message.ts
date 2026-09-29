import axios from "axios";

type ApiErrorBody = Record<string, unknown>;

function isRecord(value: unknown): value is ApiErrorBody {
  return typeof value === "object" && value !== null;
}

function getValidationMessages(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * Returns the most useful safe message supplied by an API without leaking an
 * Axios config, response object, or other implementation details into the UI.
 */
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    if (isRecord(responseData)) {
      const validationMessages = getValidationMessages(responseData.validationErrors);
      if (validationMessages.length > 0) return validationMessages.join(". ");

      if (typeof responseData.message === "string" && responseData.message.trim()) {
        return responseData.message.trim();
      }
    }

    if (typeof responseData === "string" && responseData.trim()) return responseData.trim();
    if (typeof error.message === "string" && error.message.trim()) return error.message.trim();
  }

  if (error instanceof Error && error.message.trim()) return error.message.trim();

  return fallback;
}
