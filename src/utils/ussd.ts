export const supportedUssdCodes: { serviceCode: string; networkCode: string }[] = [
  {
    serviceCode: "*456#",
    networkCode: "Airtel",
  },
  {
    serviceCode: "*789#",
    networkCode: "Tigo",
  },
];

export const validateUssdCode = (serviceCode: string): { serviceCode: string; networkCode: string } | undefined => {
  return supportedUssdCodes.find((code) => code.serviceCode === serviceCode);
};
