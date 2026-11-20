export const SUPPORTED_COUNTRIES = {
  GB: {
    code: "GB",
    name: "United Kingdom",
    currency: "GBP",
    symbol: "£",
    dialCode: "+44",
    emergencyNumber: "999",
    emergencyInstruction:
      "Call 999 (or 112) immediately and ask for Police. Share the appointment address above.",
    phonePlaceholder: "+44 7700 900123",
  },
  IE: {
    code: "IE",
    name: "Ireland",
    currency: "EUR",
    symbol: "€",
    dialCode: "+353",
    emergencyNumber: "999 / 112",
    emergencyInstruction:
      "Call 999 or 112 immediately and request An Garda Síochána. Share the appointment address above.",
    phonePlaceholder: "+353 87 123 4567",
  },
  US: {
    code: "US",
    name: "United States",
    currency: "USD",
    symbol: "$",
    dialCode: "+1",
    emergencyNumber: "911",
    emergencyInstruction:
      "Call 911 immediately and request local police dispatch to the appointment address above.",
    phonePlaceholder: "+1 555 234 5678",
  },
  CA: {
    code: "CA",
    name: "Canada",
    currency: "CAD",
    symbol: "CA$",
    dialCode: "+1",
    emergencyNumber: "911",
    emergencyInstruction:
      "Call 911 immediately and request police dispatch to the appointment address above.",
    phonePlaceholder: "+1 416 555 0199",
  },
  AU: {
    code: "AU",
    name: "Australia",
    currency: "AUD",
    symbol: "A$",
    dialCode: "+61",
    emergencyNumber: "000",
    emergencyInstruction:
      "Call 000 immediately and request Police. Share the appointment address above.",
    phonePlaceholder: "+61 412 345 678",
  },
  NZ: {
    code: "NZ",
    name: "New Zealand",
    currency: "NZD",
    symbol: "NZ$",
    dialCode: "+64",
    emergencyNumber: "111",
    emergencyInstruction:
      "Call 111 immediately and request Police. Share the appointment address above.",
    phonePlaceholder: "+64 21 123 4567",
  },
  DE: {
    code: "DE",
    name: "Germany",
    currency: "EUR",
    symbol: "€",
    dialCode: "+49",
    emergencyNumber: "110 / 112",
    emergencyInstruction:
      "Call 110 (Polizei) or 112 immediately and share the appointment address above.",
    phonePlaceholder: "+49 170 1234567",
  },
};

export const COUNTRY_LIST = [
  SUPPORTED_COUNTRIES.GB,
  SUPPORTED_COUNTRIES.IE,
  SUPPORTED_COUNTRIES.US,
  SUPPORTED_COUNTRIES.CA,
  SUPPORTED_COUNTRIES.AU,
  SUPPORTED_COUNTRIES.NZ,
  SUPPORTED_COUNTRIES.DE,
];
