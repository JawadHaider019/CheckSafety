export const COUNTRY_FLAGS = {
  GB: "🇬🇧",
  IE: "🇮🇪",
  US: "🇺🇸",
  CA: "🇨🇦",
  AU: "🇦🇺",
  NZ: "🇳🇿",
  DE: "🇩🇪",
};

export const SUPPORTED_COUNTRIES = {
  GB: {
    code: "GB",
    flag: "🇬🇧",
    name: "United Kingdom",
    currency: "GBP",
    symbol: "£",
    dialCode: "+44",
    emergencyNumber: "999",
    emergencyInstruction:
      "Call 999 (or 112) immediately and ask for Police. Share the appointment address above.",
    phonePlaceholder: "7700 900123",
  },
  IE: {
    code: "IE",
    flag: "🇮🇪",
    name: "Ireland",
    currency: "EUR",
    symbol: "€",
    dialCode: "+353",
    emergencyNumber: "999 / 112",
    emergencyInstruction:
      "Call 999 or 112 immediately and request An Garda Síochána. Share the appointment address above.",
    phonePlaceholder: "87 123 4567",
  },
  US: {
    code: "US",
    flag: "🇺🇸",
    name: "United States",
    currency: "USD",
    symbol: "$",
    dialCode: "+1",
    emergencyNumber: "911",
    emergencyInstruction:
      "Call 911 immediately and request local police dispatch to the appointment address above.",
    phonePlaceholder: "555 234 5678",
  },
  CA: {
    code: "CA",
    flag: "🇨🇦",
    name: "Canada",
    currency: "CAD",
    symbol: "CA$",
    dialCode: "+1",
    emergencyNumber: "911",
    emergencyInstruction:
      "Call 911 immediately and request police dispatch to the appointment address above.",
    phonePlaceholder: "416 555 0199",
  },
  AU: {
    code: "AU",
    flag: "🇦🇺",
    name: "Australia",
    currency: "AUD",
    symbol: "A$",
    dialCode: "+61",
    emergencyNumber: "000",
    emergencyInstruction:
      "Call 000 immediately and request Police. Share the appointment address above.",
    phonePlaceholder: "412 345 678",
  },
  NZ: {
    code: "NZ",
    flag: "🇳🇿",
    name: "New Zealand",
    currency: "NZD",
    symbol: "NZ$",
    dialCode: "+64",
    emergencyNumber: "111",
    emergencyInstruction:
      "Call 111 immediately and request Police. Share the appointment address above.",
    phonePlaceholder: "21 123 4567",
  },
  DE: {
    code: "DE",
    flag: "🇩🇪",
    name: "Germany",
    currency: "EUR",
    symbol: "€",
    dialCode: "+49",
    emergencyNumber: "110 / 112",
    emergencyInstruction:
      "Call 110 (Polizei) or 112 immediately and share the appointment address above.",
    phonePlaceholder: "170 1234567",
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
